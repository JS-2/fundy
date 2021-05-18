import React, { useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Card, CardContent, CardMedia } from '@material-ui/core';
import { IChartData } from '../common/types';

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
      <Box
        mt={10}
        mb={3}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        {props.title}
      </Box>
      <Box display="flex" justifyContent="center">
        <Box display="flex">
          <Card
            elevation={0}
            style={{
              border: 'solid 2px #e0e0e0',
              paddingTop: 30,
            }}
          >
            <CardContent>
              <div
                style={{
                  height: 600,
                  width: 1000,
                }}
              >
                <ResponsiveBar
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
                  data={props.data}
                  keys={['금액']}
                  indexBy="name"
                  margin={{ top: 10, right: 50, bottom: 50, left: 120 }}
                  padding={0.55}
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default Chart;
