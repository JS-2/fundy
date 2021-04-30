package com.ilovefundy.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomUserDetails implements UserDetails {
    private int user_id;
    private String user_email;
    private String user_password;
    private String user_nickname;
    private String user_address;
    private YesOrNo is_admin; // 관리자 여부
    private String user_picture;

    private YesOrNo is_adult; // 성인인증 여부
    private YesOrNo is_official_fan; // 팬활동 인증 여부
    private YesOrNo is_profile; // 프로필 인증 여부
    private Level user_level; // 인증레벨

    private enum YesOrNo {
        Y, N;
    }

    private enum Level {
        A, B, C, D, AA, BB, CC;
    }

    private int enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.user_password;
    }

    @Override
    public String getUsername() {
        return this.user_email;
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
}
