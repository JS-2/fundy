package com.ilovefundy.dto.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="userId")
@Getter
@Setter
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

    @BatchSize(size=10)
//    @JsonManagedReference
    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name="my_idol",
                joinColumns = @JoinColumn(name="user_id"),
                inverseJoinColumns = @JoinColumn(name="idol_id"))
    private Set<Idol> idols = new LinkedHashSet<>();

    @BatchSize(size=10)
//    @JsonManagedReference
    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name="my_funding",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="funding_id"))
    private Set<FundingProject> fundings = new LinkedHashSet<>();

    @BatchSize(size=10)
//    @JsonBackReference
    @OneToMany(mappedBy = "user")
    private List<PayInfo> fundingPays = new ArrayList<>();

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
    @Column(name = "funding_regist_count", columnDefinition = "integer default 0")
    private Integer fundingRegistCount; // 펀딩 개설 개수

    @Enumerated(EnumType.STRING)
    @Column(name = "is_admin", columnDefinition = "varchar(255) default 'N'")
    private YesOrNo isAdmin; // 관리자 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_adult")
    @ColumnDefault("'N'")
    private YesOrNo isAdult; // 성인인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_official_fan")
    @ColumnDefault("'N'")
    private YesOrNo isOfficialFan; // 팬활동 인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_profile")
    @ColumnDefault("'N'")
    private YesOrNo isProfile; // 프로필 인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "user_level")
    @ColumnDefault("'D'")
    private Level userLevel; // 인증레벨
    @Column(name = "enabled")
    @ColumnDefault("1")
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

    public enum Level { // 플러스 표시는 문자더블로 표기
        A("A"), B("B"), C("C"), D("D"), AA("AA"), BB("BB"), CC("CC");

        private String value;

        private Level(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}