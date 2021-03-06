package com.ilovefundy.entity.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ilovefundy.entity.funding.FundingNotice;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.idol.Idol;
import com.ilovefundy.entity.pay.PayInfo;
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

    @BatchSize(size = 10)
    @OneToMany(mappedBy = "user")
    private List<FundingNotice> fundingNotices = new ArrayList<>();

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
    private Integer fundingRegistCount; // ?????? ?????? ??????

    @Enumerated(EnumType.STRING)
    @Column(name = "is_admin", columnDefinition = "varchar(255) default 'N'")
    private YesOrNo isAdmin; // ????????? ??????
    @Enumerated(EnumType.STRING)
    @Column(name = "is_adult")
    @ColumnDefault("'N'")
    private YesOrNo isAdult; // ???????????? ??????
    @Enumerated(EnumType.STRING)
    @Column(name = "is_official_fan")
    @ColumnDefault("'N'")
    private IsCertification isOfficialFan; // ????????? ?????? ??????
    @Enumerated(EnumType.STRING)
    @Column(name = "is_profile")
    @ColumnDefault("'N'")
    private IsCertification isProfile; // ????????? ?????? ??????
    @Enumerated(EnumType.STRING)
    @Column(name = "user_level")
    @ColumnDefault("'D'")
    private Level userLevel; // ????????????
    @Column(name = "enabled")
    @ColumnDefault("1")
    private Integer enabled; //????????? ??????

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.isAdmin.getValue() == 1 ? "ROLE_ADMIN" : "ROLE_MEMBER"));
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

    public enum Level { // ????????? ????????? ??????????????? ??????
        A("A"), B("B"), C("C"), D("D"), AA("AA"), BB("BB"), CC("CC");

        private String value;

        private Level(String value) {
            this.value = value;
        }

        public static Level LevelUp(Level level) {
            switch (level) {
                case D:
                    return C;
                case C:
                    return B;
                case B:
                    return A;
            }
            throw new AssertionError("can't level up: " + level);
        }

        public static Level PlusAuth(Level level) {
            switch (level) {
                case C:
                    return CC;
                case B:
                    return BB;
                case A:
                    return AA;
            }
            throw new AssertionError("can't plus up: " + level);
        }

        public static boolean isNoPlus(Level level) {
            return (level == A || level == B || level == C);
        }

        public String getValue() {
            return value;
        }
    }

    public enum IsCertification {
        N("N"), Waiting("Waiting"), Approve("Approve"), Decline("Decline");

        private String value;

        private IsCertification(String value) { this.value = value; }

        public String getValue() { return value; }
    }
}