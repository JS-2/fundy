import React, { useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Card, CardContent } from '@material-ui/core';
import { IChartData } from '../common/types';

const data = [
  {
    country: '아이돌1',
    금액: 390000,
  },
  {
    country: '아이돌2',
    금액: 420000,
  },
  {
    country: '아이돌3',
    금액: 242400,
  },
  {
    country: '아이돌4',
    금액: 130520,
  },
  {
    country: '아이돌5',
    금액: 543420,
  },
];

interface Props {
  title: string;
  data: object[];
}

const Chart = (props: Props) => {
  useEffect(() => {
    console.log('props', props.data);
  }, [props]);
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        {props.title}
      </Box>
      <div style={{ height: 400 }}>
        <ResponsiveBar
          data={props.data}
          keys={['금액']}
          indexBy="name"
          margin={{ top: 10, right: 50, bottom: 50, left: 120 }}
          padding={0.5}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          defs={[
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#fa5f76',
              rotation: -45,
              lineWidth: 4,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: '금액',
              },
              id: 'lines',
            },
          ]}
          colors={'#f74a64'}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisLeft={{
            tickSize: 20,
            tickPadding: 5,
            tickRotation: 0,
            legend: '금액',
            legendPosition: 'middle',
            legendOffset: -80,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 32,
          }}
          enableLabel={false}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[]}
          animate={false}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default Chart;
