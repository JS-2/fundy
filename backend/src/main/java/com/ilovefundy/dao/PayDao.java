package com.ilovefundy.dao;

import com.ilovefundy.entity.pay.PayInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayDao extends JpaRepository<PayInfo, Integer> {

}
