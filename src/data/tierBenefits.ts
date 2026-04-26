export const tierBenefits = {
  red: {
    tierRange: '0 - 6,999',
    gaming: [
      {
        name: 'benefits.gaming.earnRedeemSlots',
        available: true
      },
      {
        name: 'benefits.gaming.earnCompDollars',
        available: true
      },
      {
        name: 'benefits.gaming.specialEvents',
        available: true
      },
      {
        name: 'benefits.gaming.prioritySlotService',
        available: false
      },
      {
        name: 'benefits.gaming.personalCasinoHost',
        available: false
      }
    ],
    resort: [
      {
        name: 'benefits.resort.hotelDiscounts',
        available: true
      },
      {
        name: 'benefits.resort.friendsFamilyOffers',
        available: true
      },
      {
        name: 'benefits.resort.contactlessCheckin',
        available: true
      },
      {
        name: 'benefits.resort.awakeningDiscount',
        available: true
      },
      {
        name: 'benefits.resort.priorityBuffetSeating',
        available: false
      },
      {
        name: 'benefits.resort.complimentaryParking',
        available: false
      },
      {
        name: 'benefits.resort.priorityRestaurantSeating',
        available: false
      },
      {
        name: 'benefits.resort.complimentaryStays',
        available: false
      }
    ],
    annual: [
      {
        name: 'benefits.annual.cruiseDiscount',
        available: true
      },
      {
        name: 'benefits.annual.birthdayFreeCredit',
        available: false
      },
      {
        name: 'benefits.annual.spaCredit',
        available: false
      },
      {
        name: 'benefits.annual.birthdayDinnerCredit',
        available: false
      }
    ]
  },
  platinum: {
    tierRange: '7,000 - 69,999',
    gaming: [
      {
        name: 'benefits.gaming.earnRedeemSlots',
        available: true
      },
      {
        name: 'benefits.gaming.earnCompDollars',
        available: true
      },
      {
        name: 'benefits.gaming.specialEvents',
        available: true
      },
      {
        name: 'benefits.gaming.prioritySlotService',
        available: true
      },
      {
        name: 'benefits.gaming.bonusSlotPoints',
        value: '20%',
        available: true
      },
      {
        name: 'benefits.gaming.personalCasinoHost',
        available: false
      }
    ],
    resort: [
      {
        name: 'benefits.resort.hotelDiscounts',
        available: true
      },
      {
        name: 'benefits.resort.friendsFamilyOffers',
        available: true
      },
      {
        name: 'benefits.resort.contactlessCheckin',
        available: true
      },
      {
        name: 'benefits.resort.awakeningDiscount',
        available: true
      },
      {
        name: 'benefits.resort.priorityBuffetSeating',
        available: true
      },
      {
        name: 'benefits.resort.complimentaryParking',
        available: true
      },
      {
        name: 'benefits.resort.priorityRestaurantSeating',
        available: false
      },
      {
        name: 'benefits.resort.complimentaryStays',
        available: false
      }
    ],
    annual: [
      {
        name: 'benefits.annual.complimentaryCruise',
        available: true
      },
      {
        name: 'benefits.annual.birthdayFreeCredit',
        available: true
      },
      {
        name: 'benefits.annual.spaCredit',
        value: '$100',
        available: true
      },
      {
        name: 'benefits.annual.birthdayDinnerCredit',
        value: '$150',
        available: true
      },
      {
        name: 'benefits.annual.connoisseurSeries',
        value: '2',
        available: true
      }
    ]
  },
  black: {
    tierRange: '70,000+',
    gaming: [
      {
        name: 'benefits.gaming.earnRedeemSlots',
        available: true
      },
      {
        name: 'benefits.gaming.earnCompDollars',
        available: true
      },
      {
        name: 'benefits.gaming.specialEvents',
        available: true
      },
      {
        name: 'benefits.gaming.prioritySlotService',
        available: true
      },
      {
        name: 'benefits.gaming.bonusSlotPoints',
        value: '30%',
        available: true
      },
      {
        name: 'benefits.gaming.personalCasinoHost',
        available: true
      }
    ],
    resort: [
      {
        name: 'benefits.resort.hotelDiscounts',
        available: true
      },
      {
        name: 'benefits.resort.friendsFamilyOffers',
        available: true
      },
      {
        name: 'benefits.resort.contactlessCheckin',
        available: true
      },
      {
        name: 'benefits.resort.awakeningDiscount',
        available: true
      },
      {
        name: 'benefits.resort.priorityBuffetSeating',
        available: true
      },
      {
        name: 'benefits.resort.complimentaryParking',
        available: true
      },
      {
        name: 'benefits.resort.priorityRestaurantSeating',
        available: true
      },
      {
        name: 'benefits.resort.preferredReservations',
        available: true
      },
      {
        name: 'benefits.resort.complimentaryStays',
        available: true
      },
      {
        name: 'benefits.resort.nightclubEntry',
        available: true
      },
      {
        name: 'benefits.resort.lateCheckout',
        available: true
      },
      {
        name: 'benefits.resort.roomUpgrade',
        available: true
      },
      {
        name: 'benefits.resort.courtesyCheckin',
        available: true
      },
      {
        name: 'benefits.resort.valetService',
        available: true
      }
    ],
    annual: [
      {
        name: 'benefits.annual.complimentaryCruise',
        available: true
      },
      {
        name: 'benefits.annual.birthdayFreeCredit',
        available: true
      },
      {
        name: 'benefits.annual.spaCredit',
        value: '$200',
        available: true
      },
      {
        name: 'benefits.annual.birthdayDinnerCredit',
        value: '$300',
        available: true
      },
      {
        name: 'benefits.annual.connoisseurSeries',
        value: '4',
        available: true
      },
      {
        name: 'benefits.annual.golfRound',
        available: true
      },
      {
        name: 'benefits.annual.encoreBostonStay',
        available: true
      }
    ]
  }
};