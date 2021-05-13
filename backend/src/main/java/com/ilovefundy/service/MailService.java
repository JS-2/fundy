package com.ilovefundy.service;

import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.utils.EncryptionUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final UserDao userDao;

    public static final String ePw = createKey();

    @Value("${api_url}")
    private String api_url;

    private MimeMessage createMessage(String to, String mode) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();

        String code;
        String url = "\"http://www.ilovefundy.com\"";
        if(mode.equals("findPassword")) code = createKey() + "q!@";
        else code = createCode(ePw);
        //보내는 대상
        message.addRecipients(Message.RecipientType.TO, to);
        // 제목
        if(mode.equals("findPassword")) {
            message.setSubject("Fundy 임시 비밀번호: " + code);
            url = "\"" + api_url + "/auth-mail/temp-password?email=" + to + "&tmpPassword=" + code + "\"";
        }
        else {
            message.setSubject("Fundy 이메일 인증 확인 코드: " + code);
        }


        String msg="";
        msg += "<img width=\"120\" height=\"36\" style=\"margin-top: 0; margin-right: 0; margin-bottom: 32px; margin-left: 0px; padding-right: 30px; padding-left: 30px;\" src=\"https://file.mk.co.kr/meet/neds/2021/04/image_readtop_2021_330747_16177500644599916.jpg\" alt=\"\" loading=\"lazy\">";
        if(mode.equals("findPassword")) {
            msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">임시 비밀번호 확인</h1>";
            msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 Fundy 가입 창이 있는 브라우저 창에 입력하세요.</p>";
        }
        else {
            msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 주소 확인</h1>";
            msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 Fundy 가입 창이 있는 브라우저 창에 입력하세요.</p>";
        }
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += code;
        msg += "</td></tr></tbody></table></div>";
        if(mode.equals("findPassword")) {
            msg += "<a href=" + url + ">임시 비밀번호로 변경</a></br>";
        }
        msg += "<a href=\"http://www.ilovefundy.com\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">Fundy</a>";

        message.setText(msg, "utf-8", "html"); //내용
        message.setFrom(new InternetAddress(to,"Fundy Admin")); //보내는 사람

        return message;
    }

    // 인증코드 생성
    public static String createKey() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public void sendSimpleMessage(String to, String mode)throws Exception {
        MimeMessage message = createMessage(to, mode);
        try{//예외처리
            mailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public String createCode(String ePw){
        return ePw.substring(0, 3) + "-" + ePw.substring(3, 6);
    }

    @Transactional
    public void patchTempPassword(User user, String tmpPassword) {
        user.setUserPassword(EncryptionUtils.encryptSHA256(tmpPassword));
        userDao.save(user);
    }
}
