package com.ilovefundy.dao;

import com.ilovefundy.dto.idol.Idol;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface IdolDao extends JpaRepository<Idol, Integer> {
    // 아이돌 상세보기
    Idol findByIdolId(int id);

    // 아이돌 이름으로 검색
    Page<Idol> findByIdolNameContainsOrIdolGroup_IdolNameContains(String name1, String name2, Pageable pageable);

    // 아이돌 리스트 (유저별 관심 아이돌)
//    Set<Idol> findByUsers(User user, Pageable pageable);
}
