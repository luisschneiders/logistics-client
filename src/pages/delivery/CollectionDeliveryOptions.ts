import { DeliverySchedule } from '../../enum/DeliverySchedule';

export const collectionDeliveryOptions = async () => {
  return [
    {
      value: DeliverySchedule.MORNING,
      description: DeliverySchedule.MORNING,
      selected: false
    },
    {
      value: DeliverySchedule.AFTERNOON,
      description: DeliverySchedule.AFTERNOON,
      selected: false
    },
    {
      value: DeliverySchedule.NIGHT,
      description: DeliverySchedule.NIGHT,
      selected: false
    },
    {
      value: DeliverySchedule.ALLDAY,
      description: DeliverySchedule.ALLDAY,
      selected: false
    },
  ]
}
