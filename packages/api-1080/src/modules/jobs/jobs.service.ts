import { Injectable, Inject } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue, JobOptions } from 'bull';
import { BullAdapter, setQueues } from 'bull-board';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import {
  JobsQueue,
  DownloadQueueProcessors,
  ScanLibraryQueueProcessors,
} from 'src/app.dto';

@Injectable()
export class JobsService {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    @InjectQueue(JobsQueue.DOWNLOAD)
    private readonly downloadQueue: Queue,
    @InjectQueue(JobsQueue.RENAME_AND_LINK)
    private readonly renameAndLinkQueue: Queue,
    @InjectQueue(JobsQueue.REFRESH_TORRENT)
    private readonly refreshTorrentQueue: Queue,
    @InjectQueue(JobsQueue.SCAN_LIBRARY)
    private readonly scanLibraryQueue: Queue
  ) {
    this.logger = this.logger.child({ context: 'JobsService' });
    this.registerQueuesIntoBullBoard();
    this.startRecurringJobs();
  }

  private registerQueuesIntoBullBoard() {
    setQueues([
      new BullAdapter(this.downloadQueue),
      new BullAdapter(this.refreshTorrentQueue),
      new BullAdapter(this.renameAndLinkQueue),
      new BullAdapter(this.scanLibraryQueue),
    ]);
  }

  private startRecurringJobs() {
    this.refreshTorrentQueue.add(
      {},
      {
        repeat: {
          cron: '*/1 * * * *', // every minute
          startDate: new Date(),
        },
      }
    );

    this.startScanLibrary({
      repeat: {
        cron: '0 */6 * * *', // every 6 hours
        startDate: new Date(),
      },
    });

    this.startFindNewEpisodes({
      repeat: {
        cron: '0 */6 * * *', // every 6 hours
        startDate: new Date(),
      },
    });

    this.startDownloadMissing({
      repeat: {
        cron: '*/30 * * * *', // every 30 minutes
        startDate: new Date(),
      },
    });
  }

  public startDownloadMovie(movieId: number) {
    this.logger.info('add download movie job', { movieId });
    return this.downloadQueue.add(
      DownloadQueueProcessors.DOWNLOAD_MOVIE,
      movieId
    );
  }

  public startDownloadSeason(seasonId: number) {
    this.logger.info('add download season job', { seasonId });
    return this.downloadQueue.add(
      DownloadQueueProcessors.DOWNLOAD_SEASON,
      seasonId
    );
  }

  public startDownloadEpisode(episodeId: number) {
    this.logger.info('add download episode job', { episodeId });
    return this.downloadQueue.add(
      DownloadQueueProcessors.DOWNLOAD_EPISODE,
      episodeId
    );
  }

  public startScanLibrary(options?: JobOptions) {
    this.logger.info('add scan library job');
    return this.scanLibraryQueue.add(
      ScanLibraryQueueProcessors.SCAN_LIBRARY_FOLDER,
      {},
      options
    );
  }

  public startFindNewEpisodes(options?: JobOptions) {
    this.logger.info('start find new episodes');
    return this.scanLibraryQueue.add(
      ScanLibraryQueueProcessors.FIND_NEW_EPISODES,
      {},
      options
    );
  }

  public startDownloadMissing(options?: JobOptions) {
    this.logger.info('start download missing files');
    return this.downloadQueue.add(
      DownloadQueueProcessors.DOWNLOAD_MISSING,
      {},
      options
    );
  }
}
