package com.ilovefundy.dao;

import com.ilovefundy.entity.funding.FundingRegister;
import com.ilovefundy.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FundingRegisterDao extends JpaRepository<FundingRegister, Integer> {
//    @Query("select u.userId, u.userNickname, f.officialFanHistory " +
//            "from User u join FundingRegister f on u.userId = f.user " +
//            "where u.isOfficialFan = 'N'")
//    Page<Object> findFanHistoryByUserIsOfficialFan(Pageable pageable);
    Page<FundingRegister> findByUser_IsOfficialFanAndOfficialFanHistoryIsNotNull(User.IsCertification cert, Pageable pageable);

    Page<FundingRegister> findByUser_IsProfileAndFundingRegisterNameIsNotNull(User.IsCertification cert, Pageable pageable);

    Optional<FundingRegister> findByUser_UserId(int user_id);

    void deleteByUser_UserId(int user_id);
}
