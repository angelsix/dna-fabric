# Get version number from config file
$version = Select-String -path ./dna.live.config '("version": ")(.*)",' -AllMatches | Foreach-Object {$_.Matches} | Foreach-Object { $_.Groups[2].Value }

# Log it
Write-Host "Creating archive version $version"

# Remove old templates
Remove-Item Templates/blank.zip -ErrorAction Ignore
Remove-Item Templates/modern1.zip -ErrorAction Ignore

#   ----------------
#    Blank Template
#   ----------------

# Clean temp folder
Remove-Item Temp -Recurse -ErrorAction Ignore

# Copy source
Copy-Item ../../Template/Source Temp/Template/Source -Recurse

# Remove unnecessary files
Remove-Item Temp/Template/Source/Html/modern1.dhtml
Remove-Item Temp/Template/Source/Sass/modern1.scss
Remove-Item Temp/Template/Source/Assets/Images -Recurse -ErrorAction Ignore
Remove-Item Temp/Template/Source/Assets/Js -Recurse -ErrorAction Ignore

# Create zip
Compress-Archive Temp/Template/* "Templates/blank.zip"

#   -------------------
#    Modern 1 Template
#   -------------------

# Clean temp folder
Remove-Item Temp -Recurse -ErrorAction Ignore

# Copy source
Copy-Item ../../Template/Source Temp/Template/Source -Recurse

# Remove unnecessary files
Remove-Item Temp/Template/Source/Html/index.dhtml

# Rename files
Move-Item Temp/Template/Source/Html/modern1.dhtml Temp/Template/Source/Html/index.dhtml

# Create zip
Compress-Archive Temp/Template/* "Templates/modern1.zip"

# Add files to archive
Compress-Archive Templates "Releases/$version.zip"
Compress-Archive Variables "Releases/$version.zip" -Update
Compress-Archive dna.live.config "Releases/$version.zip" -Update
Compress-Archive readme.md "Releases/$version.zip" -Update

# Clean temp folder
Remove-Item Temp -Recurse -ErrorAction Ignore
