import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box } from '@material-ui/core';
import { getIdolTopFive } from '../../../api/idol';

const axisBottom: any = {
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: '기간',
  legendOffset: 36,
  legendPosition: 'middle',
};

const axisLeft: any = {
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: '금액',
  legendOffset: -70,
  legendPosition: 'middle',
};

const TopChart = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getIdolTopFive().then((resp) => {
      console.log(resp.data);
      setData(resp.data);
    });
  }, []);
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
          padding: '10px',
        }}
      >
        <ResponsiveLine
          theme={{
            fontSize: 12,
          }}
          data={data}
          enableSlices="x"
          margin={{ top: 50, right: 110, bottom: 50, left: 86 }}
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
