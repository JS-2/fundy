package com.ilovefundy.dao;

import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.Set;

public interface IdolDao extends JpaRepository<Idol, Integer> {
    // 아이돌 상세보기
    Idol findByIdolId(int id);

    // 아이돌 리스트 (유저별 관심 아이돌)
//    Set<Idol> findByUsers(User user, Pageable pageable);
}
