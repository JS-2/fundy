package com.ilovefundy.service;

import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.model.idol.IdolReq;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class IdolService {
    private final IdolDao idolDao;

    public List<Object> getIdolList(int page, int per_page, String keyword) {
        List<Object> idolList = new LinkedList<>();
        Page<Idol> pages;
        if(keyword != null) {
            pages = idolDao.findByIdolNameContains(keyword, PageRequest.of(page, per_page));
        }
        else {
            pages = idolDao.findAll(PageRequest.of(page, per_page));
        }
        for(Idol idol : pages) {
            Map<String, Object> idolInfo = new LinkedHashMap<>();
            idolInfo.put("idolId", idol.getIdolId());
            idolInfo.put("idolName", idol.getIdolName());
            idolInfo.put("idolPicture", idol.getIdolPicture());
            // 그룹이 아닌 경우
            if(idol.getMembers().isEmpty()) {
                idolInfo.put("idolAgency", idol.getIdolAgency());
                idolInfo.put("idolAge", idol.getIdolAge());
                idolInfo.put("idolBirthday", idol.getIdolBirthday());
                idolInfo.put("idolBlood", idol.getIdolBlood());
                idolInfo.put("idolHeight", idol.getIdolHeight());
                idolInfo.put("idolWeight", idol.getIdolWeight());
            }
            // 그룹인 경우
            else {
                List<Object> members = new LinkedList<>();
                for(Idol member : idol.getMembers()) {
                    Map<String, Object> memberInfo = new LinkedHashMap<>();
                    memberInfo.put("memberId", member.getIdolId());
                    memberInfo.put("memberName", member.getIdolName());
                    memberInfo.put("memberPicture", member.getIdolPicture());
                    memberInfo.put("memberAgency", member.getIdolAgency());
                    memberInfo.put("memberAge", member.getIdolAge());
                    memberInfo.put("memberBirthday", member.getIdolBirthday());
                    memberInfo.put("memberBlood", member.getIdolBlood());
                    memberInfo.put("memberHeight", member.getIdolHeight());
                    memberInfo.put("memberWeight", member.getIdolWeight());
                    members.add(memberInfo);
                }
                idolInfo.put("members", members);
            }
            idolList.add(idolInfo);
        }
        return idolList;
    }

    public Idol getIdol(int id) {
        return idolDao.findByIdolId(id);
    }

    @Transactional
    public void addIdol(IdolReq idolReq) {
        Idol idol = new Idol();
        Idol group = idolDao.getOne(idolReq.getIdolGroupId());
        group.getMembers().add(idol);
        idol.setIdolAge(idolReq.getIdolAge());
        idol.setIdolAgency(idolReq.getIdolAgency());
        idol.setIdolBirthday(idolReq.getIdolBirthDay());
        idol.setIdolBlood(bloodType(idolReq.getIdolBlood()));
        idol.setIdolGroup(group);
        idol.setIdolHeight(idolReq.getIdolHeight());
        idol.setIdolWeight(idolReq.getIdolWeight());
        idol.setIdolPicture(idolReq.getIdolPicture());
        idol.setIdolName(idolReq.getIdolName());
//        idolDao.save(group);
        idolDao.save(idol);
    }

    private Idol.BloodType bloodType(String bloodType) {
        switch (bloodType){
            case "A" :
                return Idol.BloodType.A;
            case "B" :
                return Idol.BloodType.B;
            case "O" :
                return Idol.BloodType.O;
            case "AB" :
                return Idol.BloodType.AB;
        }
        return null;
    }
}
