import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getIdolMember } from '../../../api/idol';
import { Idol, IdolGroup } from '../../../common/types';
import IdolCard from '../../IdolCard';

interface Props {
  idolInfo: IdolGroup | undefined;
}

const IdolMembers = (props: Props) => {
  const [idols, setIdols] = useState<Idol[]>();

  useEffect(() => {
    setIdols(props.idolInfo?.members);
  }, [props]);
  return (
    <div>
      <Box
        mt={10}
        mb={3}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        {props.idolInfo?.idol.idolName} 멤버
      </Box>
      <Grid container spacing={2}>
        {idols?.map((idol) => (
          <Grid item container xs={3} justify="center" key={idol.idolId}>
            <IdolCard idol={idol} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IdolMembers;
