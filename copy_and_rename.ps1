
    # Load the Windows Script Host Shell COM object
    $shell = New-Object -ComObject "WScript.Shell"

    # Create a shadow copy of the volume
    $shadowCopy = & cmd /c "vssadmin create shadow /for=C:"

    # Extract the shadow copy volume name
    $shadowCopyVolume = ($shadowCopy -split "`n" | Select-String "Shadow Copy Volume:") -replace "Shadow Copy Volume:", ""

    # Define variables
    $profileId = "66af3df3342402fab05f2005"
    $sourceDir = "C:\Users\ADMIN\AppData\Local\Temp\GoLogin\profiles\$profileId"
    $shadowSourceDir = $shadowCopyVolume + ($sourceDir -replace "C:", "")

    $destinationPath = "E:\Gologin\$profileId"
    $browserPath = "E:\Gologin\Browser"
    $newName = "profile_3"

    try {
      # Attempt to copy the directory from the shadow copy to the destination
      Copy-Item -Path $shadowSourceDir -Destination $destinationPath -Recurse -ErrorAction Stop

      # Move the first file to the Browser directory
      $firstFile = Get-ChildItem -Path $destinationPath | Select-Object -First 1
      Move-Item -Path $firstFile.FullName -Destination $browserPath

      # Rename the file in the Browser directory
      Rename-Item -Path (Join-Path $browserPath $firstFile.Name) -NewName $newName

      # Remove the original profile directory
      Remove-Item -Path $destinationPath -Recurse

      Write-Host "Thư mục đã được sao chép, đổi tên và xóa thành công"
    } catch {
      Write-Host "Lỗi khi sao chép thư mục. Đang tắt tiến trình Chrome và thử lại..."
      
      # Close the Chrome processes
      Get-Process chrome | Stop-Process -Force

      # Attempt to copy the directory again
      Copy-Item -Path $shadowSourceDir -Destination $destinationPath -Recurse -ErrorAction Stop

      # Move the first file to the Browser directory
      $firstFile = Get-ChildItem -Path $destinationPath | Select-Object -First 1
      Move-Item -Path $firstFile.FullName -Destination $browserPath

      # Rename the file in the Browser directory
      Rename-Item -Path (Join-Path $browserPath $firstFile.Name) -NewName $newName

      # Remove the original profile directory
      Remove-Item -Path $destinationPath -Recurse

      Write-Host "Thư mục đã được sao chép, đổi tên và xóa thành công"
    }

    # Delete the shadow copy after copying the directory
    & cmd /c "vssadmin delete shadows /shadow=$shadowCopyVolume /quiet"

    Write-Host "Shadow copy đã được xóa"
  