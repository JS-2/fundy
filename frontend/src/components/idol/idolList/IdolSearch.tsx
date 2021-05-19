import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { getIdolList } from '../../../api/idol';
import { Idol } from '../../../common/types';
import IdolCard from '../../IdolCard';
import SearchIcon from '@material-ui/icons/Search';

const IdolSearch = () => {
  const [idolList, setIdolList] = useState<Idol[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isBottom, setIsBottom] = useState(false);
  const [keyword, setKeyword] = useState<string>();
  const [searchWord, setSearchWord] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef(null);
  const [delay, setDelay] = useState<number>(600);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    getIdolList(keyword, page).then((response) => {
      if (response.data.length === idolList.length) {
        setIsEnd(true);
      }
      setIdolList([...response.data]);
    });
  }, [page]);

  function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      if (delay === null) {
        return;
      }

      const id = setInterval(() => savedCallback.current(), delay);

      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(
    () => {
      setPage(page + 1);
    },
    isPlaying ? delay : null
  );

  useEffect(() => {
    if (isBottom) {
      setLoading(true);
      setPlaying(true);
    } else {
      setLoading(false);
      setPlaying(false);
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
    setIsEnd(false);
    setKeyword(searchWord);
    setIdolList([]);
    setPage(1);
  };

  return (
    <div>
      <Box mt={6} mb={6} display="flex" justifyContent="space-between">
        <Box
          className="nbg_bold font-smooth"
          alignItems="center"
          justifyContent="flex-end"
          style={{ fontSize: '2em' }}
        >
          아이돌 검색
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          style={{ width: '600px' }}
        >
          <TextField
            variant="outlined"
            value={searchWord}
            className="searchArea"
            onChange={(e) => {
              console.log(e.target.value);
              setSearchWord(e.target.value);
            }}
            inputProps={{
              style: {
                fontSize: '1.5em',
                height: '10px',
                borderRadius: '20px',
              },
            }}
            style={{
              paddingRight: '5px',
              width: '400px',
              borderRadius: '20px',
            }}
          ></TextField>
          <Button
            className="ml-2 btn_main"
            disableElevation
            variant="contained"
            onClick={handleSearch}
            style={{ fontSize: '1.4em' }}
          >
            {' '}
            검색{' '}
          </Button>
        </Box>
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
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress
          style={{
            height: !isEnd && loading ? '50px' : '0px',
            opacity: !isEnd && loading ? 1 : 0,
            transition: 'height 0.5s ease-in-out, opacity 0.5s ease-in-out',
          }}
        />
      </Box>
    </div>
  );
};

export default IdolSearch;
