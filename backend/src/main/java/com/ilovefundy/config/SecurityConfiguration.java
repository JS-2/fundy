package com.ilovefundy.config;

import com.ilovefundy.security.CustomAccessDeniedHandler;
import com.ilovefundy.security.CustomAuthenticationEntryPoint;
import com.ilovefundy.security.JwtAuthenticationFilter;
import com.ilovefundy.security.JwtTokenProvider;
import com.ilovefundy.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()  // security 에서 기본으로 생성하는 로그인페이지 사용 안 함
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable()   // REST API 를 사용하기 때문에 csrf(사이트간 위조방지 목적으로 사용하는 토큰) 사용 안함
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT 인증을 사용하므로 세션 사용
            .and()
                    .authorizeRequests()    // 사용권한 체크
                        .antMatchers("/admin/**").hasRole("ADMIN") //관리자 권한
                        .antMatchers("/user/**", "/grade/**").hasAnyRole("MEMBER", "ADMIN") // 회원 권한
                        .anyRequest().permitAll()   // 그 외 나머지 요청은 누구나 접근가능
            .and()
                    .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
                    .and()
                    .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                    .and()
                    // JwtAuthenticationFilter 를 id/password 인증 필터 전에 넣음
                    .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs",
                                    "/configuration/ui",
                                    "/swagger-resources/**",
                                    "/configuration/security",
                                    "/swagger-ui.html",
                                    "/webjars/**",
                                    "/css/**", "/js/**", "/img/**", "/lib/**");
        // swagger 및 static 디렉터리의 하위 파일 목록은 인증받을 필요 없음
    }

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService);
    }

    // Security 에서 CORS 정책 허용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.addExposedHeader("token");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
