package com.ilovefundy.dao.user;

import com.ilovefundy.dto.user.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserDao extends JpaRepository<User, Integer>{

    //이메일 중복 확인
    User findByUserEmail(String user_email);

    //로그인
    User findByUserEmailAndUserPassword(String user_email, String user_password);

    //닉네임 정보 찾기
    User findByUserNickname(String user_nickname);

    //회원정보 수정
    User save(User user);

    //회원 삭제
    User deleteByUserEmail(String user_email);
}