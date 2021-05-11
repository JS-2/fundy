package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.idol.IdolResponse;
import com.ilovefundy.model.idol.IdolRequest;
import com.ilovefundy.utils.SetterUtils;
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
    private final FundingDao fundingDao;

    public List<IdolResponse> getIdolList(int page, int per_page, String keyword) {
        List<IdolResponse> idolList = new LinkedList<>();
        Page<Idol> pages;
        if(keyword != null) {
            pages = idolDao.findByIdolNameContainsOrIdolGroup_IdolNameContains(keyword, keyword, PageRequest.of(page, per_page));
        }
        else {
            pages = idolDao.findAll(PageRequest.of(page, per_page));
        }
        for(Idol idol : pages) {
            idolList.add(SetterUtils.setIdolResponse(idol));
        }
        return idolList;
    }

    public Map<String, Object> getIdol(int idol_id) {
        Map<String, Object> result = new LinkedHashMap<>();

        Idol idol = idolDao.findByIdolId(idol_id);
        Map<String, Object> idolInfo = new LinkedHashMap<>();
        // 아이돌 상세정보
        idolInfo.put("idol", SetterUtils.setIdolResponse(idol));
        // 그룹인 경우 멤버정보까지
        if(!idol.getMembers().isEmpty()) {
            List<IdolResponse> members = new LinkedList<>();
            for(Idol member : idol.getMembers()) {
                if(idol_id == member.getIdolId()) continue; // 자기 자신은 포함 X
                members.add(SetterUtils.setIdolResponse(member));
            }
            idolInfo.put("members", members);
        }
        result.put("idolInfo", idolInfo);

        // 아이돌 or 그룹이 진행한 펀딩 리스트
        List<FundingListResponse> idolFundingProject = new LinkedList<>();
        List<FundingProject> fundingProjectList = fundingDao.findByIdolIdOrderByFundingEndTimeDesc(idol_id);
        for(FundingProject fundingProject : fundingProjectList) {
            idolFundingProject.add(SetterUtils.setFundingListResponse(fundingProject));
        }
        // 그룹인 경우
        if(!idol.getMembers().isEmpty()) {
            // 멤버(개인)들이 진행하는 펀딩까지 포함
            for(Idol member : idol.getMembers()) {
                if(idol_id == member.getIdolId()) continue; // 자기 자신은 포함 X
                List<FundingProject> memberFundingProjectList = fundingDao.findByIdolIdOrderByFundingEndTimeDesc(member.getIdolId());
                for(FundingProject fundingProject : memberFundingProjectList) {
                    idolFundingProject.add(SetterUtils.setFundingListResponse(fundingProject));
                }
            }
        }
        // 아이돌(개인)인 경우
        else {
            // 그룹이 진행하는 펀딩까지 포함
            List<FundingProject> groupFundingProjectList = fundingDao.findByIdolIdOrderByFundingEndTimeDesc(idol.getIdolGroup().getIdolId());
            for(FundingProject fundingProject : groupFundingProjectList) {
                idolFundingProject.add(SetterUtils.setFundingListResponse(fundingProject));
            }
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
}
