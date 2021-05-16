package com.ilovefundy.entity.funding;

import com.ilovefundy.entity.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "funding_register")
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
public class FundingRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "funding_register_id")
    private Integer fundingRegisterId;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id")
    private User user;

    //프로필 인증
    @Column(name = "funding_register_name")
    private String fundingRegisterName;
    @Column(name = "funding_register_picture")
    private String fundingRegisterPicture;
    @Column(name = "funding_register_age")
    private Integer fundingRegisterAge;

    @Column(name = "funding_register_history", columnDefinition = "LONGTEXT")
    private String fundingRegisterHistory; // 총대 경력
    @Column(name = "official_fan_history", columnDefinition = "LONGTEXT")
    private String officialFanHistory; // 팬활동 경력
}
