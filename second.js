const fs = require('fs');
const path = require('path');
const request = require('request');
const { exec } = require('child_process');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

// Đọc cấu hình từ tệp config.json
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const { token, initial_profile_number, amount_profile_created, source_des, des_path, batch_save_path,allFonts } = config;

// Hàm để tạo profile và trả về id từ phản hồi JSON
const createProfile = async (profileNumber) => {
  return new Promise((resolve, reject) => {
    const selectedFonts = getRandomSubset(allFonts, 120, 180);
    const options = {
      method: "POST",
      url: "https://api.gologin.com/browser",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
    name: `profile_${profileNumber}`,
    autoLang: true,
    bookmarks: {},
    isBookmarksSynced: true,
    proxyEnabled: false,
    googleClientId: "",
    googleServicesEnabled: true,
    startUrl: "",
    lockEnabled: false,
    dns: "",
    proxy: {
      mode: "none",
      host: "",
      port: 80,
      username: "",
      password: "",
      autoProxyRegion: "us",
      torProxyRegion: "us",
    },
    geoProxyInfo: {
      connection: "",
      country: "",
      region: "",
      city: "",
    },
    browserType: "chrome",
    os: "win",
    osSpec: "win11",
    isM1: false,
    timezone: {
      enabled: true,
      fillBasedOnIp: true,
      timezone: "",
    },
    navigator: {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      resolution: "1152x864",
      language: "en-US,en;q=0.9",
      platform: "Win32",
      hardwareConcurrency: 4,
      deviceMemory: 4,
      doNotTrack: false,
      maxTouchPoints: 0,
    },
    canvas: {
      mode: "noise",
    },
    geolocation: {
      mode: "prompt",
      enabled: true,
      fillBasedOnIp: true,
      customize: true,
      latitude: 0,
      longitude: 0,
      accuracy: 10,
    },
    webRTC: {
      enable: false,
      isEmptyIceList: true,
      mode: "public",
    },
    webGL: {
      mode: "noise",
    },
    clientRects: {
      mode: "noise",
    },
    webGLMetadata: {
      mode: "mask",
      vendor: "Google Inc. (Intel)",
      rerender: "",
      renderer:
        `ANGLE (Intel, Intel(R) UHD Graphics (0x${getRandomHex()}) Direct3D11 vs_5_0 ps_5_0, D3D11)`,
    },
    audioContext: {
      mode: "noise",
    },
    fonts: {
      enableMasking: true,
      enableDomRect: true,
      families: selectedFonts,
    },
    mediaDevices: {
      enableMasking: true,
      audioInputs: 1,
      audioOutputs: 1,
      videoInputs: 1,
    },
    extensions: {
      enabled: true,
      preloadCustom: true,
      names: [],
    },
    storage: {
      local: true,
      extensions: true,
      bookmarks: true,
      history: true,
      passwords: true,
      session: true,
      indexedDb: false,
      enableExternalExtensions: false,
    },
    plugins: {
      enableVulnerable: true,
      enableFlash: true,
    },
    cookies: [],
    devicePixelRatio: 1,
    chromeExtensions: [],
    userChromeExtensions: [],
    minResolution: "800x600",
    maxResolution: "1280x960",
    uaUserVersion: "latest",
    language: "",
    debugMode: null,
    folders: [],
    webglParams: {
      glCanvas: "webgl2",
      supportedFunctions: [
        {
          name: "beginQuery",
          supported: true,
        },
        {
          name: "beginTransformFeedback",
          supported: true,
        },
        {
          name: "bindBufferBase",
          supported: true,
        },
        {
          name: "bindBufferRange",
          supported: true,
        },
        {
          name: "bindSampler",
          supported: true,
        },
        {
          name: "bindTransformFeedback",
          supported: true,
        },
        {
          name: "bindVertexArray",
          supported: true,
        },
        {
          name: "blitFramebuffer",
          supported: true,
        },
        {
          name: "clearBufferfi",
          supported: true,
        },
        {
          name: "clearBufferfv",
          supported: true,
        },
        {
          name: "clearBufferiv",
          supported: true,
        },
        {
          name: "clearBufferuiv",
          supported: true,
        },
        {
          name: "clientWaitSync",
          supported: true,
        },
        {
          name: "compressedTexImage3D",
          supported: true,
        },
        {
          name: "compressedTexSubImage3D",
          supported: true,
        },
        {
          name: "copyBufferSubData",
          supported: true,
        },
        {
          name: "copyTexSubImage3D",
          supported: true,
        },
        {
          name: "createQuery",
          supported: true,
        },
        {
          name: "createSampler",
          supported: true,
        },
        {
          name: "createTransformFeedback",
          supported: true,
        },
        {
          name: "createVertexArray",
          supported: true,
        },
        {
          name: "deleteQuery",
          supported: true,
        },
        {
          name: "deleteSampler",
          supported: true,
        },
        {
          name: "deleteSync",
          supported: true,
        },
        {
          name: "deleteTransformFeedback",
          supported: true,
        },
        {
          name: "deleteVertexArray",
          supported: true,
        },
        {
          name: "drawArraysInstanced",
          supported: true,
        },
        {
          name: "drawBuffers",
          supported: true,
        },
        {
          name: "drawElementsInstanced",
          supported: true,
        },
        {
          name: "drawRangeElements",
          supported: true,
        },
        {
          name: "endQuery",
          supported: true,
        },
        {
          name: "endTransformFeedback",
          supported: true,
        },
        {
          name: "fenceSync",
          supported: true,
        },
        {
          name: "framebufferTextureLayer",
          supported: true,
        },
        {
          name: "getActiveUniformBlockName",
          supported: true,
        },
        {
          name: "getActiveUniformBlockParameter",
          supported: true,
        },
        {
          name: "getActiveUniforms",
          supported: true,
        },
        {
          name: "getBufferSubData",
          supported: true,
        },
        {
          name: "getFragDataLocation",
          supported: true,
        },
        {
          name: "getIndexedParameter",
          supported: true,
        },
        {
          name: "getInternalformatParameter",
          supported: true,
        },
        {
          name: "getQuery",
          supported: true,
        },
        {
          name: "getQueryParameter",
          supported: true,
        },
        {
          name: "getSamplerParameter",
          supported: true,
        },
        {
          name: "getSyncParameter",
          supported: true,
        },
        {
          name: "getTransformFeedbackVarying",
          supported: true,
        },
        {
          name: "getUniformBlockIndex",
          supported: true,
        },
        {
          name: "getUniformIndices",
          supported: true,
        },
        {
          name: "invalidateFramebuffer",
          supported: true,
        },
        {
          name: "invalidateSubFramebuffer",
          supported: true,
        },
        {
          name: "isQuery",
          supported: true,
        },
        {
          name: "isSampler",
          supported: true,
        },
        {
          name: "isSync",
          supported: true,
        },
        {
          name: "isTransformFeedback",
          supported: true,
        },
        {
          name: "isVertexArray",
          supported: true,
        },
        {
          name: "pauseTransformFeedback",
          supported: true,
        },
        {
          name: "readBuffer",
          supported: true,
        },
        {
          name: "renderbufferStorageMultisample",
          supported: true,
        },
        {
          name: "resumeTransformFeedback",
          supported: true,
        },
        {
          name: "samplerParameterf",
          supported: true,
        },
        {
          name: "samplerParameteri",
          supported: true,
        },
        {
          name: "texImage3D",
          supported: true,
        },
        {
          name: "texStorage2D",
          supported: true,
        },
        {
          name: "texStorage3D",
          supported: true,
        },
        {
          name: "texSubImage3D",
          supported: true,
        },
        {
          name: "transformFeedbackVaryings",
          supported: true,
        },
        {
          name: "uniform1ui",
          supported: true,
        },
        {
          name: "uniform1uiv",
          supported: true,
        },
        {
          name: "uniform2ui",
          supported: true,
        },
        {
          name: "uniform2uiv",
          supported: true,
        },
        {
          name: "uniform3ui",
          supported: true,
        },
        {
          name: "uniform3uiv",
          supported: true,
        },
        {
          name: "uniform4ui",
          supported: true,
        },
        {
          name: "uniform4uiv",
          supported: true,
        },
        {
          name: "uniformBlockBinding",
          supported: true,
        },
        {
          name: "uniformMatrix2x3fv",
          supported: true,
        },
        {
          name: "uniformMatrix2x4fv",
          supported: true,
        },
        {
          name: "uniformMatrix3x2fv",
          supported: true,
        },
        {
          name: "uniformMatrix3x4fv",
          supported: true,
        },
        {
          name: "uniformMatrix4x2fv",
          supported: true,
        },
        {
          name: "uniformMatrix4x3fv",
          supported: true,
        },
        {
          name: "vertexAttribDivisor",
          supported: true,
        },
        {
          name: "vertexAttribI4i",
          supported: true,
        },
        {
          name: "vertexAttribI4iv",
          supported: true,
        },
        {
          name: "vertexAttribI4ui",
          supported: true,
        },
        {
          name: "vertexAttribI4uiv",
          supported: true,
        },
        {
          name: "vertexAttribIPointer",
          supported: true,
        },
        {
          name: "waitSync",
          supported: true,
        },
      ],
      glParamValues: [
        {
          name: "ALIASED_LINE_WIDTH_RANGE",
          value: {
            0: 1,
            1: 1,
          },
        },
        {
          name: "ALIASED_POINT_SIZE_RANGE",
          value: {
            0: 1,
            1: 1024,
          },
        },
        {
          name: ["DEPTH_BITS", "STENCIL_BITS"],
          value: "n/a",
        },
        {
          name: "MAX_3D_TEXTURE_SIZE",
          value: 2048,
        },
        {
          name: "MAX_ARRAY_TEXTURE_LAYERS",
          value: 2048,
        },
        {
          name: "MAX_COLOR_ATTACHMENTS",
          value: 8,
        },
        {
          name: "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",
          value: 200704,
        },
        {
          name: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
          value: 32,
        },
        {
          name: "MAX_COMBINED_UNIFORM_BLOCKS",
          value: 24,
        },
        {
          name: "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",
          value: 212992,
        },
        {
          name: "MAX_CUBE_MAP_TEXTURE_SIZE",
          value: 16384,
        },
        {
          name: "MAX_DRAW_BUFFERS",
          value: 8,
        },
        {
          name: "MAX_FRAGMENT_INPUT_COMPONENTS",
          value: 120,
        },
        {
          name: "MAX_FRAGMENT_UNIFORM_BLOCKS",
          value: 12,
        },
        {
          name: "MAX_FRAGMENT_UNIFORM_COMPONENTS",
          value: 4096,
        },
        {
          name: "MAX_FRAGMENT_UNIFORM_VECTORS",
          value: 1024,
        },
        {
          name: "MAX_PROGRAM_TEXEL_OFFSET",
          value: 7,
        },
        {
          name: "MAX_RENDERBUFFER_SIZE",
          value: 16384,
        },
        {
          name: "MAX_SAMPLES",
          value: 16,
        },
        {
          name: "MAX_TEXTURE_IMAGE_UNITS",
          value: 16,
        },
        {
          name: "MAX_TEXTURE_LOD_BIAS",
          value: 2,
        },
        {
          name: "MAX_TEXTURE_SIZE",
          value: 16384,
        },
        {
          name: "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",
          value: 120,
        },
        {
          name: "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",
          value: 4,
        },
        {
          name: "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS",
          value: 4,
        },
        {
          name: "MAX_UNIFORM_BLOCK_SIZE",
          value: 65536,
        },
        {
          name: "MAX_UNIFORM_BUFFER_BINDINGS",
          value: 24,
        },
        {
          name: "MAX_VARYING_COMPONENTS",
          value: 120,
        },
        {
          name: "MAX_VARYING_VECTORS",
          value: 30,
        },
        {
          name: "MAX_VERTEX_ATTRIBS",
          value: 16,
        },
        {
          name: "MAX_VERTEX_OUTPUT_COMPONENTS",
          value: 120,
        },
        {
          name: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
          value: 16,
        },
        {
          name: "MAX_VERTEX_UNIFORM_BLOCKS",
          value: 12,
        },
        {
          name: "MAX_VERTEX_UNIFORM_COMPONENTS",
          value: 16384,
        },
        {
          name: "MAX_VERTEX_UNIFORM_VECTORS",
          value: 4096,
        },
        {
          name: "MAX_VIEWPORT_DIMS",
          value: {
            0: 32767,
            1: 32767,
          },
        },
        {
          name: "MIN_PROGRAM_TEXEL_OFFSET",
          value: -8,
        },
        {
          name: ["RED_BITS", "GREEN_BITS", "BLUE_BITS", "ALPHA_BITS"],
          value: "n/a",
        },
        {
          name: "RENDERER",
          value: "WebKit WebGL",
        },
        {
          name: "SHADING_LANGUAGE_VERSION",
          value: "WebGL GLSL ES 3.00 (OpenGL ES GLSL ES 3.0 Chromium)",
        },
        {
          name: "UNIFORM_BUFFER_OFFSET_ALIGNMENT",
          value: 256,
        },
        {
          name: "VENDOR",
          value: "WebKit",
        },
        {
          name: "VERSION",
          value: "WebGL 2.0 (OpenGL ES 3.0 Chromium)",
        },
      ],
      antialiasing: true,
      textureMaxAnisotropyExt: 16,
      shaiderPrecisionFormat: "highp/highp",
      extensions: [
        "EXT_clip_control",
        "EXT_color_buffer_float",
        "EXT_color_buffer_half_float",
        "EXT_conservative_depth",
        "EXT_depth_clamp",
        "EXT_disjoint_timer_query_webgl2",
        "EXT_float_blend",
        "EXT_polygon_offset_clamp",
        "EXT_render_snorm",
        "EXT_texture_compression_bptc",
        "EXT_texture_compression_rgtc",
        "EXT_texture_filter_anisotropic",
        "EXT_texture_mirror_clamp_to_edge",
        "EXT_texture_norm16",
        "KHR_parallel_shader_compile",
        "NV_shader_noperspective_interpolation",
        "OES_draw_buffers_indexed",
        "OES_sample_variables",
        "OES_shader_multisample_interpolation",
        "OES_texture_float_linear",
        "OVR_multiview2",
        "WEBGL_blend_func_extended",
        "WEBGL_clip_cull_distance",
        "WEBGL_compressed_texture_s3tc",
        "WEBGL_compressed_texture_s3tc_srgb",
        "WEBGL_debug_renderer_info",
        "WEBGL_debug_shaders",
        "WEBGL_lose_context",
        "WEBGL_multi_draw",
        "WEBGL_polygon_mode",
        "WEBGL_provoking_vertex",
        "WEBGL_stencil_texturing",
      ],
    },
    chromeExtensionsToNewProfiles: [],
    userChromeExtensionsToNewProfiles: [],
    newStartupUrlLogic: true,
  
      })
    };

    request(options, (error, response) => {
      if (error) return reject(error);
      const data = JSON.parse(response.body);
      resolve(data.id); // Trả về id từ phản hồi JSON
    });
  });
};

// Hàm để khởi động profile
const startProfile = async (profileId) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:36912/browser/start-profile',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "profileId": profileId,
        "sync": false
      })
    };

    request(options, (error, response) => {
      if (error) return reject(error);
      resolve(response.body);
    });
  });
};
// Hàm tạo webgl renderer ngẫu nhiên
function getRandomHex() {
  // Tạo số ngẫu nhiên từ 10000 đến 100000
  const decimalValue = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
  
  // Chuyển đổi số thập phân thành mã hex và thêm số 0 ở phía trước để đạt đủ 8 ký tự
  const hexValue = decimalValue.toString(16).toUpperCase().padStart(8, '0');

  return hexValue;
}
// Hàm để lấy  phần tử ngẫu nhiên từ mảng
function getRandomSubset(arr, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
// Hàm để sao chép thư mục, di chuyển file đầu tiên, đổi tên và xóa thư mục ban đầu
const copyAndRename = async (profileId, profileNumber) => {
  const powershellScript = `
    # Load the Windows Script Host Shell COM object
    $shell = New-Object -ComObject "WScript.Shell"

    # Create a shadow copy of the volume
    $shadowCopy = & cmd /c "vssadmin create shadow /for=C:"

    # Extract the shadow copy volume name
    $shadowCopyVolume = ($shadowCopy -split "\`n" | Select-String "Shadow Copy Volume:") -replace "Shadow Copy Volume:", ""

    # Define variables
    $profileId = "${profileId}"
    $sourceDir = "${source_des}\\$profileId"
    $shadowSourceDir = $shadowCopyVolume + ($sourceDir -replace "C:", "")

    $destinationPath = "${des_path}\\$profileId"
    $browserPath = "${des_path}\\Browser"
    $newName = "profile_${profileNumber}"

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
  `;

  await writeFile('copy_and_rename.ps1', powershellScript);

  return new Promise((resolve, reject) => {
    exec('powershell -NoProfile -ExecutionPolicy Bypass -File copy_and_rename.ps1', (error, stdout, stderr) => {
      if (error) return reject(error);
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
};

// Hàm để tạo file batch
const createBatchFile = async (profileNumber) => {
  const batchContent = `Start /max "" "..\\orbita-browser\\chrome.exe" --user-data-dir="..\\browser\\profile_${profileNumber}"`;
  const batchFileName = `${batch_save_path}\\start_profile_${profileNumber}.bat`;
  await writeFile(batchFileName, batchContent);
  console.log(`Batch file created: ${batchFileName}`);
};

const main = async () => {
  try {
    for (let i = 0; i < amount_profile_created; i++) {
      console.log(`Iteration ${i + 1}`);

      // Tạo profile và lưu profileId
      const profileNumber = initial_profile_number + i;
      const profileId = await createProfile(profileNumber);
      console.log(`Profile ID saved: ${profileId}`);

      // Khởi động profile
      const startProfileResult = await startProfile(profileId);
      console.log(startProfileResult);

      // Chờ 2 giây
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Sao chép thư mục, di chuyển file, đổi tên và xóa thư mục ban đầu
      await copyAndRename(profileId, profileNumber);

      // Tạo file batch
      await createBatchFile(profileNumber);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

main();
