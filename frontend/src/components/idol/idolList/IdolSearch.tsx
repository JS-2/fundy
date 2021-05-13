import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { getIdolList } from '../../../api/idol';
import { Idol } from '../../../common/types';
import IdolCard from '../../IdolCard';

const IdolSearch = () => {
  const [idolList, setIdolList] = useState<Idol[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isBottom, setIsBottom] = useState(false);
  const [keyword, setKeyword] = useState<string>();
  const [searchWord, setSearchWord] = useState<string>('');

  const containerRef = useRef(null);

  useEffect(() => {
    getIdolList(keyword, page).then((response) => {
      setIdolList([...idolList, ...response.data]);
    });
  }, [page]);

  useEffect(() => {
    if (isBottom) {
      console.log('스크롤 추가');
      setPage(page + 1);
    }
  }, [isBottom]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const callback = (entries: any) => {
    const [entry] = entries;
    setIsBottom(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (containerRef.current) {
      observer.observe(containerRef.current!);
    }
    return () => observer && observer.disconnect();
  }, [containerRef]);

  const handleSearch = () => {
    setKeyword(searchWord);
    setIdolList([]);
    setTimeout(() => {
      setPage(1);
    }, 500);
  };

  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        아이돌 리스트
      </Box>
      <Box
        mb={3}
        display="flex"
        alignContent="center"
        justifyContent="flex-end"
      >
        <TextField
          variant="outlined"
          size="small"
          value={searchWord}
          onChange={(e) => {
            console.log(e.target.value);
            setSearchWord(e.target.value);
          }}
        ></TextField>
        <Button
          className="ml-2"
          disableElevation
          variant="contained"
          onClick={handleSearch}
        >
          {' '}
          검색{' '}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {idolList.map((idol, index) => {
          return (
            <Grid item container xs={3} justify="center" key={index}>
              <IdolCard idol={idol} key={index} />
            </Grid>
          );
        })}
      </Grid>
      <div ref={containerRef}> </div>
    </div>
  );
};

export default IdolSearch;
