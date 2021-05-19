import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Card, CardContent, CardMedia, darken } from '@material-ui/core';
import { IChartData } from '../common/types';

interface Props {
  title: string;
  data: object[];
  mouseOverPlace: number;
}

const Chart = (props: Props) => {
  const [placeName, setPlaceName] = useState<String>('');

  useEffect(() => {
    if (props.mouseOverPlace == 1) {
      setPlaceName('하트하트재단');
    } else if (props.mouseOverPlace == 2) {
      setPlaceName('아름다운재단');
    } else if (props.mouseOverPlace == 3) {
      setPlaceName('굿피플');
    } else if (props.mouseOverPlace == 4) {
      setPlaceName('푸르메재단');
    } else {
      setPlaceName('');
    }
  }, [props.mouseOverPlace]);
  return (
    <div
      style={{
        height: 600,
        width: '100%',
      }}
    >
      <ResponsiveBar
        theme={{
          fontSize: 12,
        }}
        tooltip={(node) => (
          <div>
            <div style={{ textAlign: 'center' }} className="nbg_bold">
              {String(node.indexValue)}
            </div>
            <div>
              {String(node.value).replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ','
              )}
              원
            </div>
          </div>
        )}
        onMouseEnter={(_data, event) => {
          const target: any = event.target;
          target.style.fill = '#f74a64';
        }}
        onMouseLeave={(_data, event) => {
          const target: any = event.target;
          target.style = '';
        }}
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
            color: '#f74a64',
            rotation: -45,
            lineWidth: 100,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: (d) => {
              const data: any = d.data;
              return data.indexValue === placeName;
            },
            id: 'lines',
          },
        ]}
        colors={'silver'}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisLeft={{
          tickSize: 20,
          tickPadding: 5,
          tickRotation: 0,
          legend: '금액',
          legendPosition: 'middle',
          legendOffset: -80,
          tickValues: 4,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 32,
        }}
        enableLabel={true}
        label={(d) =>
          `\\ ${String(d.value).replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ','
          )}`
        }
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default Chart;
