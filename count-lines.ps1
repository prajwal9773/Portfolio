Write-Host "Counting lines of code in Stellar Code Lab Portfolio"
Write-Host "============================================================"

$extensions = @("*.tsx", "*.ts", "*.jsx", "*.js", "*.css", "*.html", "*.json")
$excludeDirs = @("node_modules", ".git", "dist", "build", ".next", "coverage")

$totalLines = 0
$fileCount = 0
$categoryTotals = @{}

function Get-FileCategory($extension) {
    switch ($extension) {
        ".tsx" { return "React Components" }
        ".ts" { return "TypeScript" }
        ".jsx" { return "React Components" }
        ".js" { return "JavaScript" }
        ".css" { return "Stylesheets" }
        ".html" { return "HTML" }
        ".json" { return "Configuration" }
        default { return "Other" }
    }
}

$files = Get-ChildItem -Path . -Recurse -Include $extensions | Where-Object {
    $exclude = $false
    foreach ($dir in $excludeDirs) {
        if ($_.FullName -like "*\$dir\*" -or $_.FullName -like "*/$dir/*") {
            $exclude = $true
            break
        }
    }
    -not $exclude
}

Write-Host ""
Write-Host "Found $($files.Count) files to analyze"
Write-Host ""

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -ErrorAction Stop
        $lineCount = $content.Count
        $extension = $file.Extension
        $category = Get-FileCategory $extension

        $totalLines += $lineCount
        $fileCount++

        if (-not $categoryTotals.ContainsKey($category)) {
            $categoryTotals[$category] = @{ Lines = 0; Files = 0 }
        }
        $categoryTotals[$category].Lines += $lineCount
        $categoryTotals[$category].Files++

        $relativePath = $file.FullName.Replace((Get-Location).Path, "").TrimStart("\", "/")
        Write-Host "  $relativePath : $lineCount lines"

    } catch {
        Write-Host "  Error reading $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "============================================================"
Write-Host "SUMMARY"
Write-Host "============================================================"

Write-Host ""
Write-Host "Total Lines of Code: $totalLines"
Write-Host "Total Files: $fileCount"

Write-Host ""
Write-Host "Breakdown by Category:"
foreach ($category in $categoryTotals.Keys | Sort-Object) {
    $data = $categoryTotals[$category]
    $percentage = [math]::Round(($data.Lines / $totalLines) * 100, 1)
    Write-Host "  $category : $($data.Lines) lines ($($data.Files) files) - $percentage%"
}

Write-Host ""
Write-Host "Analysis Complete!"
