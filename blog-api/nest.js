# Save this as split-files.ps1 and run in PowerShell (run as your user)
# Make sure nest.js is at: C:\Users\palam\OneDrive\Desktop\Nest JS\nest.js
$srcFile = "C:\Users\palam\OneDrive\Desktop\Nest JS\nest.js"
$projectRoot = "C:\Users\palam\OneDrive\Desktop\Nest JS\blog-api"

if (-not (Test-Path $srcFile)) { Write-Error "Source file not found: $srcFile"; exit 1 }
$input = Get-Content -Raw -Path $srcFile
$regex = [regex]::new('(?ms)// FILE: ([^\r\n]+)\r?\n')
$matches = $regex.Matches($input)
if ($matches.Count -eq 0) { Write-Error "No // FILE: markers found in $srcFile"; exit 1 }

for ($i = 0; $i -lt $matches.Count; $i++) {
  $filePathRel = $matches[$i].Groups[1].Value.Trim()
  $start = $matches[$i].Index + $matches[$i].Length
  $end = if ($i -lt $matches.Count - 1) { $matches[$i+1].Index } else { $input.Length }
  $length = $end - $start
  $content = $input.Substring($start, $length).Trim("`r","`n")
  $outPath = Join-Path $projectRoot $filePathRel
  $outDir = Split-Path $outPath -Parent
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
  $content | Out-File -FilePath $outPath -Encoding utf8
  Write-Host "Wrote $outPath"
}

Write-Host "Splitting done. Next:"
Write-Host "cd `"$projectRoot`""
Write-Host "npm install"
Write-Host "npx tsc --noEmit"
Write-Host "npm run start:dev"