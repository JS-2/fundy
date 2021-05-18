import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box } from '@material-ui/core';

const axisBottom: any = {
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'transportation',
  legendOffset: 36,
  legendPosition: 'middle',
};

const axisLeft: any = {
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'count',
  legendOffset: -40,
  legendPosition: 'middle',
};

const TopChart = () => {
  const [data, setData] = useState<any>([
    {
      id: 'japan',
      color: 'hsl(16, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 250,
        },
        {
          x: 'helicopter',
          y: 255,
        },
        {
          x: 'boat',
          y: 185,
        },
        {
          x: 'train',
          y: 286,
        },
        {
          x: 'subway',
          y: 142,
        },
        {
          x: 'bus',
          y: 120,
        },
        {
          x: 'car',
          y: 80,
        },
        {
          x: 'moto',
          y: 61,
        },
        {
          x: 'bicycle',
          y: 9,
        },
        {
          x: 'horse',
          y: 1,
        },
        {
          x: 'skateboard',
          y: 259,
        },
        {
          x: 'others',
          y: 226,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(145, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 58,
        },
        {
          x: 'helicopter',
          y: 32,
        },
        {
          x: 'boat',
          y: 222,
        },
        {
          x: 'train',
          y: 251,
        },
        {
          x: 'subway',
          y: 162,
        },
        {
          x: 'bus',
          y: 86,
        },
        {
          x: 'car',
          y: 143,
        },
        {
          x: 'moto',
          y: 250,
        },
        {
          x: 'bicycle',
          y: 14,
        },
        {
          x: 'horse',
          y: 190,
        },
        {
          x: 'skateboard',
          y: 17,
        },
        {
          x: 'others',
          y: 50,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(117, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 35,
        },
        {
          x: 'helicopter',
          y: 276,
        },
        {
          x: 'boat',
          y: 184,
        },
        {
          x: 'train',
          y: 219,
        },
        {
          x: 'subway',
          y: 16,
        },
        {
          x: 'bus',
          y: 212,
        },
        {
          x: 'car',
          y: 227,
        },
        {
          x: 'moto',
          y: 112,
        },
        {
          x: 'bicycle',
          y: 75,
        },
        {
          x: 'horse',
          y: 108,
        },
        {
          x: 'skateboard',
          y: 24,
        },
        {
          x: 'others',
          y: 249,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(333, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 36,
        },
        {
          x: 'helicopter',
          y: 267,
        },
        {
          x: 'boat',
          y: 276,
        },
        {
          x: 'train',
          y: 124,
        },
        {
          x: 'subway',
          y: 245,
        },
        {
          x: 'bus',
          y: 24,
        },
        {
          x: 'car',
          y: 241,
        },
        {
          x: 'moto',
          y: 32,
        },
        {
          x: 'bicycle',
          y: 135,
        },
        {
          x: 'horse',
          y: 194,
        },
        {
          x: 'skateboard',
          y: 72,
        },
        {
          x: 'others',
          y: 84,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(124, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 224,
        },
        {
          x: 'helicopter',
          y: 75,
        },
        {
          x: 'boat',
          y: 278,
        },
        {
          x: 'train',
          y: 164,
        },
        {
          x: 'subway',
          y: 272,
        },
        {
          x: 'bus',
          y: 4,
        },
        {
          x: 'car',
          y: 157,
        },
        {
          x: 'moto',
          y: 59,
        },
        {
          x: 'bicycle',
          y: 98,
        },
        {
          x: 'horse',
          y: 105,
        },
        {
          x: 'skateboard',
          y: 209,
        },
        {
          x: 'others',
          y: 117,
        },
      ],
    },
  ]);

  return (
    <>
      <Box
        mt={10}
        mb={3}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        아이돌 후원 순위 집계
      </Box>
      <div
        style={{
          height: 600,
          width: '100%',
        }}
      >
        <ResponsiveLine
          data={data}
          enableSlices="x"
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          axisBottom={axisBottom}
          axisLeft={axisLeft}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default TopChart;
