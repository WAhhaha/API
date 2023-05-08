import cliProgress from 'cli-progress';

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(200, 0);

for(let i = 0; i < 200; i++)  bar1.update(i);
bar1.stop();
