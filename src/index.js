const fs = require('fs').promises;
const path = require('path');
const core = require('@actions/core');
const {glob} = require('glob-gitignore');

getFiles(dir, patterns, ignore).then(async ret => {
    core.info(`Counted ${ret.lines} Lines from ${ret.counted} Files, ignoring ${ret.ignored} Files.`)
    core.info(`Took: ${Date.now() - st}`);

    core.setOutput("total_lines", `${ret.lines}`);
    core.setOutput("ignored_files", `${ret.ignored}`);
    core.setOutput("counted_files", `${ret.counted}`);
    core.setOutput("elapsed_ms", `${Date.now() - st}`);
    core.setOutput("output_path", `${path.resolve(badge)}`);
    core.setOutput("output_dir", `${path.resolve(path.dirname(badge))}`);

    await fs.mkdir(path.dirname(badge), {recursive: true})

    await fs.writeFile(badge, makeBadge(ret.lines.toLocaleString(), badgeOpts));
})