import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { orderBy, uniqBy } from 'lodash';
import { useRouter } from 'next/router';
import { SearchOutlined } from '@ant-design/icons';

import { formatNumber } from '../../utils/format-number';
import { availableIn } from '../../utils/available-in';

import {
  useGetMissingQuery,
  MissingTvEpisodesFragment,
  MissingMoviesFragment,
} from '../../utils/graphql';

import { ManualSearchComponent } from '../manual-search/manual-search.component';
import { MissingComponentStyles } from './missing.styles';

export function MissingComponent() {
  const { pathname } = useRouter();
  const { data } = useGetMissingQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 5000,
  });

  const [manualSearch, setManualSearch] = useState<
    MissingTvEpisodesFragment | MissingMoviesFragment | null
  >(null);

  const isMovies = pathname.includes('movies');
  const rows: Array<MissingTvEpisodesFragment | MissingMoviesFragment> =
    (isMovies ? data?.movies : data?.tvEpisodes) || [];

  if (rows.length > 0) {
    const withDate = orderBy(
      rows.map((row) => ({ ...row, date: dayjs(row.releaseDate) })),
      ['date'],
      ['asc']
    );

    const missing = withDate.filter((row) => row.date.isBefore(new Date()));
    const notAired = uniqBy(
      withDate.filter((row) => row.date.isAfter(new Date())),
      'tvShow.id'
    );

    return (
      <>
        {manualSearch && (
          <ManualSearchComponent
            media={manualSearch}
            onRequestClose={() => setManualSearch(null)}
          />
        )}

        <MissingComponentStyles>
          <div className="wrapper">
            {missing.map((row) => (
              <div key={row.id} className="row">
                {/* missing movie */}
                {row.__typename === 'EnrichedMovie' && (
                  <div>
                    <span className="title">{row.title}</span>
                    <span className="date">({row.date.format('YYYY')})</span>
                  </div>
                )}

                {/* missing tv episode */}
                {row.__typename === 'EnrichedTVEpisode' && (
                  <div>
                    <span className="title">{row.tvShow?.title}</span>
                    <span className="episode-number">
                      S{formatNumber(row.seasonNumber!)}E
                      {formatNumber(row.episodeNumber!)}
                    </span>
                  </div>
                )}

                <Tag
                  style={{ cursor: 'pointer' }}
                  onClick={() => setManualSearch(row)}
                >
                  <SearchOutlined /> Missing
                </Tag>
              </div>
            ))}

            {notAired.map((row) => (
              <div key={row.id} className="row">
                {/* not released movie */}
                {row.__typename === 'EnrichedMovie' && (
                  <div>
                    <span className="title">{row.title}</span>
                    <span className="date">({row.date.format('YYYY')})</span>
                  </div>
                )}

                {/* not aired tv episode */}
                {row.__typename === 'EnrichedTVEpisode' && (
                  <div>
                    <span className="title">{row.tvShow?.title}</span>
                    <span className="episode-number">
                      S{formatNumber(row.seasonNumber!)}E
                      {formatNumber(row.episodeNumber!)}
                    </span>
                  </div>
                )}

                <Tag>{availableIn(row.date)}</Tag>
              </div>
            ))}
          </div>
        </MissingComponentStyles>
      </>
    );
  }

  return <noscript />;
}
