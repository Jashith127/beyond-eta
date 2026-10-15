// Teaching scenario, not any company's model or inferred production weights.
export const ETA_SCENARIO = {
 assignmentMinutes:0,
 riderToRestaurantMinutes:4,
 kitchenReadyMinutes:8,
 restaurantToCustomerMinutes:12
};
export function illustrativeETA(scenario=ETA_SCENARIO) {
 return Math.max(scenario.assignmentMinutes+scenario.riderToRestaurantMinutes,scenario.kitchenReadyMinutes)+scenario.restaurantToCustomerMinutes;
}
export const WORKER_CONTEXT = {
 rain:'Rain may affect the estimate. Wet clothing and reduced visibility are part of the rider’s experience.',
 traffic:'Traffic may affect the estimate. Time in congestion also occupies the rider and delays their next job.',
 hazard:'A route estimate cannot describe every obstacle. Slowing down or stopping can be the safe response.',
 heat:'Weather data is not a measure of this rider’s discomfort or need for a break.',
 restaurant:'Waiting can already be predicted. That does not tell us whether the rider is paid for that time.',
 wait:'This pause is recorded as part of the journey. The meter does not decide whether it is paid.',
 ride:'',
 clear:'An on-time delivery can still include difficult conditions. The record preserves what happened.'
};
