package com.ilovefundy.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "user_password")
    private String userPassword;
    @Column(name = "user_nickname")
    private String userNickname;
    @Column(name = "user_address")
    private String userAddress;
    @Column(name = "user_picture")
    private String userPicture;
    @Column(name = "funding_regist_count")
    private Integer fundingRegistCount; // 펀딩 개설 개수

    @Enumerated(EnumType.STRING)
    @Column(name = "is_admin")
    private YesOrNo isAdmin; // 관리자 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_adult")
    private YesOrNo isAdult; // 성인인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_official_fan")
    private YesOrNo isOfficialFan; // 팬활동 인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_profile")
    private YesOrNo isProfile; // 프로필 인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "user_level")
    private Level userLevel; // 인증레벨
    @Column(name = "enabled")
    private Integer enabled; //활성화 여부

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.isAdmin.getValue() == 1 ? "ADMIN" : "MEMBER"));
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.userPassword;
    }

    @Override
    public String getUsername() {
        return this.userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled == 1;
    }

    public enum YesOrNo {
        Y(1), N(0);

        private int value;

        private YesOrNo(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

    private enum Level { // 플러스 표시는 문자더블로 표기
        A, B, C, D, AA, BB, CC;
    }
}