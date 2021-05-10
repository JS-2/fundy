package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import com.ilovefundy.model.idol.IdolReq;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class IdolService {
    private final IdolDao idolDao;
    private final FundingDao fundingDao;

    public List<Object> getIdolList(int page, int per_page, String keyword) {
        List<Object> idolList = new LinkedList<>();
        Page<Idol> pages;
        if(keyword != null) {
            pages = idolDao.findByIdolNameContainsOrIdolGroup_IdolNameContains(keyword, keyword, PageRequest.of(page, per_page));
        }
        else {
            pages = idolDao.findAll(PageRequest.of(page, per_page));
        }
        for(Idol idol : pages) {
            Map<String, Object> idolInfo = new LinkedHashMap<>();
            idolInfo.put("idolId", idol.getIdolId());
            idolInfo.put("idolGroupId", idol.getIdolGroup().getIdolId());
            idolInfo.put("idolName", idol.getIdolName());
            idolInfo.put("idolPicture", idol.getIdolPicture());
            idolInfo.put("idolAgency", idol.getIdolAgency());
            idolInfo.put("idolBirthday", idol.getIdolBirthday());
            // 그룹이 아닌 경우
            if(idol.getMembers().isEmpty()) {
                idolInfo.put("idolAge", idol.getIdolAge());
                idolInfo.put("idolBlood", idol.getIdolBlood());
                idolInfo.put("idolHeight", idol.getIdolHeight());
                idolInfo.put("idolWeight", idol.getIdolWeight());
            }
            idolList.add(idolInfo);
        }
        return idolList;
    }

    public Map<String, Object> getIdol(int idol_id) {
        Map<String, Object> result = new LinkedHashMap<>();

        // 그룹인 경우
        Idol idol = idolDao.findByIdolId(idol_id);

        Map<String, Object> idolInfo = new LinkedHashMap<>();
        idolInfo.put("idolId", idol.getIdolId());
        idolInfo.put("idolGroupId", idol.getIdolGroup().getIdolId());
        idolInfo.put("idolName", idol.getIdolName());
        idolInfo.put("idolPicture", idol.getIdolPicture());
        idolInfo.put("idolAgency", idol.getIdolAgency());
        idolInfo.put("idolBirthday", idol.getIdolBirthday());
        idolInfo.put("idolAge", idol.getIdolAge());
        idolInfo.put("idolBlood", idol.getIdolBlood());
        idolInfo.put("idolHeight", idol.getIdolHeight());
        idolInfo.put("idolWeight", idol.getIdolWeight());

        // 그룹인 경우
        if(idol.getMembers() != null) {
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
        result.put("idolInfo", idolInfo);

        List<Object> idolFundingProject = new ArrayList<>();
        List<FundingProject> fundingProjectList = fundingDao.findByIdolId(idol_id);
        for(FundingProject fundingProject : fundingProjectList) {
            Map<String, Object> tmpProject = new LinkedHashMap<>();
            tmpProject.put("fundingProjectId", fundingProject.getFundingId());
            tmpProject.put("fundingProjectName", fundingProject.getFundingName());
            tmpProject.put("fundingProjectThumbnail", fundingProject.getFundingThumbnail());
            int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
            tmpProject.put("fundingProjectRemainDay", remainDay);
            int amount = 0;
            List<PayInfo> payInfo = fundingProject.getUserPays();
            for(PayInfo pay : payInfo) {
                amount += pay.getPayAmount();
            }
            int achievementRate = 0;
            if(fundingProject.getFundingGoalAmount() != 0) {
                achievementRate = 100 * amount / fundingProject.getFundingGoalAmount();
            }
            tmpProject.put("fundingProjectAchievementRate", achievementRate);
            idolFundingProject.add(tmpProject);
        }
        result.put("idolFundingProject", idolFundingProject);

        return result;
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
