package com.ilovefundy.service;

import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.user.User;
import com.ilovefundy.model.user.SignupRequest;
import com.ilovefundy.security.JwtTokenProvider;
import com.ilovefundy.utils.EncryptionUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import javax.persistence.EntityManager;
import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final IdolDao idolDao;
    private final JwtTokenProvider jwtTokenProvider;
    private final EntityManager em;

    // Form Validation 에러 메세지를 Map 에 담아 반환
    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for(FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }

        return validatorResult;
    }

    public String getToken(User userInfo) {
//        Object user = userDao.
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userInfo.getIsAdmin().getValue()==1?"ADMIN":"MEMBER"));
        return jwtTokenProvider.createToken(userInfo.getUserEmail(), authorities);
    }

    public Optional<User> checkEmailAndPassword(String email, String password) {
        return userDao.findByUserEmailAndUserPassword(email, password);
    }

    public boolean isDuplicatedEmail(String email) {
        return userDao.findByUserEmail(email) != null;
    }

    public boolean isDuplicatedNickname(String nickname) {
        return userDao.findByUserNickname(nickname) != null;
    }

    public void signUp(SignupRequest req) {
        User user = new User();
        user.setUserEmail(req.getEmail());
        user.setUserPassword(EncryptionUtils.encryptSHA256(req.getPassword()));
        user.setUserNickname(req.getNickname());
        user.setUserAddress(req.getAddress());
        userDao.save(user);
    }

    public User getUserInfo(int user_id) {
        return userDao.findByUserId(user_id);
    }

    public boolean checkNickname(String nickname) {
        return !Pattern.matches("^[A-Za-z가-힣]{2,8}$", nickname);
    }

    public void patchNickname(int user_id, String nickname) {
        User user = userDao.findByUserId(user_id);
        user.setUserNickname(nickname);
        userDao.save(user);
    }

    public void patchAddress(int user_id, String address) {
        User user = userDao.findByUserId(user_id);
        user.setUserAddress(address);
        userDao.save(user);
    }

    public boolean checkPassword(String password) {
        return !Pattern.matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", password);
    }

    public void patchPassword(int user_id, String password) {
        User user = userDao.findByUserId(user_id);
        user.setUserPassword(EncryptionUtils.encryptSHA256(password));
        userDao.save(user);
    }

    public void patchPicture(int user_id, String picture) {
        User user = userDao.findByUserId(user_id);
        user.setUserPicture(picture);
        userDao.save(user);
    }

    public void deleteUser(int user_id) {
        userDao.deleteById(user_id);
    }

    public Set<Idol> getMyIdolList(int user_id) {
        User user = userDao.findByUserId(user_id);
        return user.getIdols();
    }

    @Transactional
    public void addMyIdol(int user_id, int idol_id) {
        User user = userDao.getOne(user_id);
        Idol idol = idolDao.findByIdolId(idol_id);
        if(user.getIdols() == null) {
            user.setIdols(new LinkedHashSet<>());
        }
        user.getIdols().add(idol);
        idol.getUsers().add(user);
        userDao.save(user);
    }

    public void removeMyIdol(int user_id, int idol_id) {
        User user = userDao.getOne(user_id);
        Idol idol = idolDao.findByIdolId(idol_id);
        user.getIdols().remove(idol);
        idol.getUsers().remove(user);
        userDao.save(user);
    }
}
