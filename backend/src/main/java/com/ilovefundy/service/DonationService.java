package com.ilovefundy.service;

import com.ilovefundy.dao.DonationDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.donation.Donation;
import com.ilovefundy.dto.donation.DonationPlace;
import com.ilovefundy.dto.idol.Idol;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class DonationService {
    private final DonationDao donationDao;
    private final IdolDao idolDao;

    public List<Object> getIdolDonationList(int idol_id) {
        Idol idol = idolDao.findByIdolId(idol_id);
        List<Donation> idolDonationList = idol.getDonations();

        List<Object> result = new ArrayList<>();
        for(Donation donation : idolDonationList) {
            Map<String, Object> tmpDonation = new LinkedHashMap<>();
            DonationPlace place = donation.getDonationPlace();
            Map<String, Object> tmpPlace = new LinkedHashMap<>();
            tmpPlace.put("donationPlaceId", place.getDonationPlaceId());
            tmpPlace.put("placeName", place.getPlaceName());
            tmpPlace.put("placeAddress", place.getPlaceAddress());
            tmpPlace.put("placeTotalAmount", place.getPlaceTotalAmount());
            tmpPlace.put("accountNumber", place.getAccountNumber());
            tmpDonation.put("donationPlace", tmpPlace);
            tmpDonation.put("idolDonationAmount", donation.getIdolDonationAmount());
        }
        return result;
    }
}
