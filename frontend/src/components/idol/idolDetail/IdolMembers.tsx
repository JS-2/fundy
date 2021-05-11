import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getIdolMember } from '../../../api/idol';
import { Idol } from '../../../common/types';
import IdolCard from '../../IdolCard';

interface Props {
  idolInfo: Idol | undefined;
}

const IdolMembers = (props: Props) => {
  const [idols, setIdols] = useState<Idol[]>();

  useEffect(() => {
    if (props.idolInfo?.idolName !== undefined) {
      getIdolMember(props.idolInfo.idolName).then((resp) => {
        setIdols(
          resp.data.filter((idol: Idol) => idol.idolId !== idol.idolGroupId)
        );
      });
    }
  }, [props]);
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        {props.idolInfo?.idolName} 멤버
      </Box>
      <Grid container spacing={2}>
        {idols?.map((idol) => (
          <Grid item container xs={3} justify="center">
            <IdolCard idol={idol} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IdolMembers;
