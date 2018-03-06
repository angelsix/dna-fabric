# Get version number from config file
$version = Select-String -path ./dna.live.config '("version": ")(.*)",' -AllMatches | Foreach-Object {$_.Matches} | Foreach-Object { $_.Groups[2].Value }

# Log it
Write-Host "Creating archive version $version"

# Remove old templates
Remove-Item Templates/blank.zip -ErrorAction Ignore -Force
Remove-Item Templates/modern1.zip -ErrorAction Ignore -Force

# Ensure Templates folder exists
If(!(Test-Path Templates))
{
      New-Item -ItemType Directory -Force -Path Templates
}

#   ----------------
#    Blank Template
#   ----------------

# Clean temp folder
Remove-Item Temp -Recurse -ErrorAction Ignore -Force
Remove-Item Temp -Recurse -ErrorAction Ignore -Force

# Copy source
Copy-Item ../../Template Temp/Template -Recurse

# Remove unnecessary files
Remove-Item Temp/Template/Source/Assets/Images -Recurse -Force
Remove-Item Temp/Template/Source/Assets/Js -Recurse -Force
Remove-Item Temp/Template/Source/Sass/modern1.scss -Force
Remove-Item Temp/Template/Source/Sass/Modern1 -Recurse -Force
Remove-Item Temp/Template/Source/Html/Modern1 -Recurse -Force
Remove-Item Temp/Template/ServerRoot -Recurse -ErrorAction Ignore -Force

# Create zip
Compress-Archive Temp/Template/* "Templates/blank.zip"

#   -------------------
#    Modern 1 Template
#   -------------------

# Clean temp folder
Remove-Item Temp -Recurse -ErrorAction Ignore -Force

# Copy source
Copy-Item ../../Template Temp/Template -Recurse

# Remove unnecessary files
Remove-Item Temp/Template/Source/Html/index.dhtml -Force
Remove-Item Temp/Template/ServerRoot/.vs -Recurse -ErrorAction Ignore -Force
Remove-Item Temp/Template/ServerRoot/bin -Recurse -ErrorAction Ignore -Force
Remove-Item Temp/Template/ServerRoot/obj -Recurse -ErrorAction Ignore -Force
Remove-Item Temp/Template/ServerRoot/Controllers -Recurse -ErrorAction Ignore -Force
Remove-Item Temp/Template/ServerRoot/Views -Recurse -ErrorAction Ignore -Force
Remove-Item Temp/Template/ServerRoot/wwwroot -Recurse -ErrorAction Ignore -Force

# Create zip
Compress-Archive Temp/Template/* "Templates/modern1.zip"

# Add files to archive
Compress-Archive Templates "Releases/$version.zip"
Compress-Archive Variables "Releases/$version.zip" -Update
Compress-Archive dna.live.config "Releases/$version.zip" -Update
Compress-Archive readme.md "Releases/$version.zip" -Update

# Clean temp folder
Remove-Item Temp -Recurse -ErrorAction Ignore -Force
