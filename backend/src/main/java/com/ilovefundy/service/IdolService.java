package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.idol.IdolResponse;
import com.ilovefundy.model.idol.IdolRequest;
import com.ilovefundy.model.idol.MemberInfo;
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

    public List<IdolResponse> getIdolList(int page, int per_page, String keyword) {
        List<IdolResponse> idolList = new ArrayList<>();
        Page<Idol> pages;
        if(keyword != null) {
            pages = idolDao.findByIdolNameContainsOrIdolGroup_IdolNameContains(keyword, keyword, PageRequest.of(page, per_page));
        }
        else {
            pages = idolDao.findAll(PageRequest.of(page, per_page));
        }
        for(Idol idol : pages) {
            idolList.add(setIdolResponse(idol));
        }
        return idolList;
    }

    public Map<String, Object> getIdol(int idol_id) {
        Map<String, Object> result = new LinkedHashMap<>();

        // 그룹인 경우
        Idol idol = idolDao.findByIdolId(idol_id);

        Map<String, Object> idolInfo = new LinkedHashMap<>();

        idolInfo.put("idol", setIdolResponse(idol));
        // 그룹인 경우
        if(idol.getMembers() != null) {
            List<MemberInfo> members = new LinkedList<>();
            for(Idol member : idol.getMembers()) {
                MemberInfo memberInfo = new MemberInfo();
                memberInfo.setMemberId(member.getIdolId());
                memberInfo.setMemberName(member.getIdolName());
                memberInfo.setMemberPicture(member.getIdolPicture());
                memberInfo.setMemberAgency(member.getIdolAgency());
                memberInfo.setMemberAge(member.getIdolAge());
                memberInfo.setMemberBirthday(member.getIdolBirthday());
                memberInfo.setMemberBlood(member.getIdolBlood());
                memberInfo.setMemberHeight(member.getIdolHeight());
                memberInfo.setMemberWeight(member.getIdolWeight());
                members.add(memberInfo);
            }
            idolInfo.put("members", members);
        }
        result.put("idolInfo", idolInfo);

        List<FundingListResponse> idolFundingProject = new ArrayList<>();
        List<FundingProject> fundingProjectList = fundingDao.findByIdolId(idol_id);
        for(FundingProject fundingProject : fundingProjectList) {
            FundingListResponse fundingResponse = new FundingListResponse();
            fundingResponse.setFundingId(fundingProject.getFundingId());
            fundingResponse.setFundingName(fundingProject.getFundingName());
            fundingResponse.setFundingSubtitle(fundingProject.getFundingSubtitle());
            fundingResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
            int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
            fundingResponse.setFundingRemainDay(remainDay);
            int amount = 0;
            List<PayInfo> payInfo = fundingProject.getUserPays();
            for(PayInfo pay : payInfo) {
                amount += pay.getPayAmount();
            }
            int achievementRate = 0;
            if(fundingProject.getFundingGoalAmount() != 0) {
                achievementRate = 100 * amount / fundingProject.getFundingGoalAmount();
            }
            fundingResponse.setFundingAchievementRate(achievementRate);
            idolFundingProject.add(fundingResponse);
        }
        result.put("idolFundingProject", idolFundingProject);

        return result;
    }

    @Transactional
    public void addIdol(IdolRequest idolReq) {
        Idol idol = new Idol();
        Idol group = idolDao.getOne(idolReq.getIdolGroupId());
        group.getMembers().add(idol);
        idol.setIdolAge(idolReq.getIdolAge());
        idol.setIdolAgency(idolReq.getIdolAgency());
        idol.setIdolBirthday(idolReq.getIdolBirthDay());
        idol.setIdolBlood(idolReq.getIdolBlood());
        idol.setIdolGroup(group);
        idol.setIdolHeight(idolReq.getIdolHeight());
        idol.setIdolWeight(idolReq.getIdolWeight());
        idol.setIdolPicture(idolReq.getIdolPicture());
        idol.setIdolName(idolReq.getIdolName());
//        idolDao.save(group);
        idolDao.save(idol);
    }

    private IdolResponse setIdolResponse(Idol idol) {
        IdolResponse idolResponse = new IdolResponse();
        idolResponse.setIdolId(idol.getIdolId());
        idolResponse.setIdolGroupId(idol.getIdolGroup().getIdolId());
        idolResponse.setIdolName(idol.getIdolName());
        idolResponse.setIdolPicture(idol.getIdolPicture());
        idolResponse.setIdolAgency(idol.getIdolAgency());
        idolResponse.setIdolBirthday(idol.getIdolBirthday());
        idolResponse.setIdolAge(idol.getIdolAge());
        idolResponse.setIdolBlood(idol.getIdolBlood());
        idolResponse.setIdolHeight(idol.getIdolHeight());
        idolResponse.setIdolWeight(idol.getIdolWeight());
        return idolResponse;
    }
}
