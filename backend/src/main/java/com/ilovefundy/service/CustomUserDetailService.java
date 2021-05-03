package com.ilovefundy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
//    @Autowired
//    UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null; /*userDao.getUserByEmail(username);*/
        if(user == null) {
            throw new UsernameNotFoundException(String.format("'%s' 아이디가 존재하지 않습니다.", username));
        }
        else {
            return user;
        }
    }
}
