package com.ilovefundy.service;

import com.ilovefundy.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
//    @Autowired
//    UserDao userDao;
    private final JwtTokenProvider jwtTokenProvider;

    // Form Validation 에러 메세지를 Map 에 담아 반환
    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for(FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }

        return validatorResult;
    }

    public String getToken(Object userInfo) {
//        Object user = userDao.
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("MEMBER"/*userInfo.getIsAdmin()?"ADMIN":"MEMBER"*/));
        return jwtTokenProvider.createToken("asdf@naver.com"/*userInfo.getUserEmail()*/, authorities);
    }
}
