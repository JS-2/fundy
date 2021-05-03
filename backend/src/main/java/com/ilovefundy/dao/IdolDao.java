package com.ilovefundy.dao;

import com.ilovefundy.dto.idol.Idol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IdolDao extends JpaRepository<Idol, Integer> {
    // 아이돌 상세보기
    Idol findByIdolId(int id);
}
