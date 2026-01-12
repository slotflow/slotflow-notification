# SLOTFLOW NOTIFICATION SERVICE





# kafka
KAFKA_CLIENT_ID=slotflow-notification-service
KAFKA_INAPP_NOTIFICATION_GROUP_ID=inapp-notification-group
KAFKA_PUSH_NOTIFICATION_GROUP_ID=push-notification-group
KAFKA_GOOGLE_CALENDAR_NOTIFICATION_GROUP_ID=google-calendar-notification-group
KAFKA_EMAIL_NOTIFICATION_GROUP_ID=email-notification-group
KAFKA_BROKERS_1=localhost:9094
KAFKA_BROKERS_2=localhost:9095
KAFKA_BROKERS_3=localhost:9096

# MBS => MAIN BACKEND SERVICE
# NS => NOTIFICATION SERVICE
# PS => PAYMENT SERVICE
# TODO means what to do when that event comes
# props means the data coming with the event
# payload meand the data sending with the event

###### MBS ######

#### kafka topics from MBS to publish ####

# 1. send otp ( to provider or user ) => MBS -> NS
## payload { email: string, otp: number, name: string, , purpose: Purpose }
KAFKA_SEND_OTP=sendOtp

# 2. send successfull registration ( to provider or user ) => MBS -> NS
## payload { email: string, name: string }
KAFKA_REGISTER_SUCCESS=register-success

# 3. admin approve/reject provider ( to provider) => MBS -> NS
## payload { email: string, name: string, status: AdminVerificationStatus, reason?: string  }
KAFKA_ADMIN_PROVIDER_REVIEW=admin-provider-review-status-change

# 4. admin block/unblock provider or user ( to provider or user ) => MBS -> NS
## payload { email: string, name: string, blocked: boolean, providerId: string  }
KAFKA_ACCOUNT_BLOCK_STATUS=account-block-status-change

# 5. admin trust/untrust provider ( to provider ) => MBS -> NS
## payload { email: string, name: string, trusted: boolean, reason?: string, providerId: string   }
KAFKA_ACCOUNT_TRUST_STATUS=account-trust-status-change

# 6. provider change appointment status => MBS -> NS
## changing the status to CONFIRM / REJECT
## payload { email: string, name: string, appointmentStatus: AppointmentStatus, appointmentDate: string, appointmentTime: string, appointmentMode: AppointmentMode, userId: string, userAccessToken: string , providerAccessToken: string  }
KAFKA_PROVIDER_APPOINTMENT_STATUS=provider-appointment-status-change

# 7. user or provider third party app connected => MBS -> NS
## payload { email: string, name: string, app: AppConnect, userOrProviderId: string }
KAFKA_APP_CONNECT=app-connect

# 8. provider trial subscription ( to provider ) => MBS -> NS
## payload { email: string, name: string, providerId: string , subscriptionStartDate: string, subscriptionEndDate: string }
KAFKA_PROVIDER_TRIAL_SUBSCRIPTION=provider-trial-subscription

// TODO
# 9. provider subscription payment event => MBS -> PS
## payload { transactionId: string, paymentStatus: paymentStatus, paymentMethod: paymentMethod, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT=provider-subscription-payment

# 10. user booking payment event => MBS -> PS
## payload { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, userId: string, providerId: string }
KAFKA_USER_BOOKING_INITIATED=user-booking-initiated

// TODO
# 11. provider payout payment event => MBS -> PS
## payload { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string }
KAFKA_PROVIDER_PAYOUT=provider-payout

// TODO
# 12. user cancel booking event => MBS -> PS
## payload { bookingId: string, paymentId?: string, userId: string , providerId: string , userEmail: string , userName: string }
KAFKA_USER_CANCEL_BOOKING=user-cancel-booking

# 13. user booking created event => MBS -> NS
## payload { name: string, email: string, providerName: string, providerEmail: string, userId: string , providerId: string }
KAFKA_USER_BOOKING_CREATED=user-booking-created



#### kafka topics to MBS to subscribe ####

# 1. provider subscription payment success event
## TODO update subscription paymentStatus
## props { subscriptionId: string, providerId: string, name: string, email: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS=provider-subscription-payment-success

# 2. provider subscription payment failed event
## props { transactionId: string, paymentStatus: paymentStatus, paymentMethod: paymentMethod, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, subscriptionId: string }
## TODO re publish provider subscription payment event with the same props
    ## KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT=provider-subscription-payment
    ## payload { transactionId: string, paymentStatus: paymentStatus, paymentMethod: paymentMethod, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, subscriptionId: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_FAILED=provider-subscription-payment-failed

# 3. user booking payment success event
## TODO update booking payment status to Paid
## props { bookingId: string, name: string, email: string, providerName: string, providerEmail: string }
    ## TODO publish KAFKA_USER_BOOKING_CREATED=user-booking-created
    ## payload { name: string, email: string, providerName: string, providerEmail: string, userId: string , providerId: string }
KAFKA_USER_BOOKING_PAYMENT_SUCCESS=user-booking-payment-success

# 4. user booking payment failed event
## TODO update booking payment status to Pending
## props { bookingId: string, name: string, email: string, providerName: string, providerEmail: string }
KAFKA_USER_BOOKING_PAYMENT_FAILED=user-booking-payment-failed

# 5. provider payout success event
## props { providerId: string, name: string, email: string }
## TODO update payout status in paypout collection
KAFKA_PROVIDER_PAYOUT_SUCCESS=provider-payout-success

# 6. provider payout failed event
## props { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, retry: boolean , retryCount: number }
## TODO re publish provider payout event with same props
    ## KAFKA_PROVIDER_PAYOUT=provider-payout
    ## payload { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, retry: boolean , retryCount: number }
KAFKA_PROVIDER_PAYOUT_FAILED=provider-payout-failed

# 7. google calendar events created event
## props { bookingId: string, userCalendarEventId: string, providerCalendarEventId: string }
## TODO update booking
KAFKA_GOOGLE_CALENDAR_EVENTS_CREATED=google-calendar-events-created

# 8. user cancel booking failed event
## payload { bookingId: string, paymentId: string, userId: string , providerId: string , userEmail: string , userName: string }
## TODO re publish user cancel booking event with same props
    ## KAFKA_USER_CANCEL_BOOKING=user-cancel-booking
    ## props { bookingId: string, paymentId: string, userId: string , providerId: string , userEmail: string , userName: string }
KAFKA_USER_CANCEL_BOOKING_FAILED=user-cancel-booking-failed

# 9. user cancel booking success event
## props { bookingId: string, name: string, email: string, paymentId: string, , providerName: string, providerEmail: string }
## TODO update booking status to refunded
KAFKA_USER_CANCEL_BOOKING_SUCCESS=user-cancel-booking-success





###### NS ######

#### kafka topics from NS to publish ####

# 1. google calendar events created => NS -> MBS
## payload { bookingId: string, userCalendarEventId: string, providerCalendarEventId: string }
KAFKA_GOOGLE_CALENDAR_EVENTS_CREATED=google-calendar-events-created



#### kafka topics from NS to subscribe ####

# 1. send otp
## TODO send email with otp ( email consumer )
## props { email: string, otp: number, name: string, purpose: Purpose }
KAFKA_SEND_OTP=sendOtp

# 2. send successfull registration
## TODO send email ( email consumer )
## props { email: string, name: string }
KAFKA_REGISTER_SUCCESS=register-success

# 3. admin approve/reject provider
## TODO send email to provider ( email consumer )
## props { email: string, name: string, status: AdminVerificationStatus, reason?: string  }
KAFKA_ADMIN_PROVIDER_REVIEW=admin-provider-review-status-change

# 4. admin block/unblock provider or user
## TODO send email ( email consumer )
## TODO send push notification ( push-notification consumer )
## props { email: string, name: string, blocked: boolean, providerId: string  }
KAFKA_ACCOUNT_BLOCK_STATUS=account-block-status-change

# 5. admin trust/untrust provider
## TODO send email ( email consumer )
## TODO send push notification ( push-notification consumer )
## props { email: string, name: string, trusted: boolean, reason?: string, providerId: string   }
KAFKA_ACCOUNT_TRUST_STATUS=account-trust-status-change

# 6. provider change appointment status
## changing the status to CONFIRM / REJECT
## TODO send email to user ( email consumer )
## TODO send push notification to user ( push-notification consumer )
## TODO create inapp notification for provider ( inapp-notification consumer )
## TODO create calendar event ( if the appointmentStatus is Confirmed ) for the user and provider ( google-calender consumer )
    ## if calendar event added publish an event
    ## KAFKA_GOOGLE_CALENDAR_EVENTS_CREATED=google-calendar-events-created => NS -> MBS
    ## payload { bookingId: string, userCalendarEventId: string, providerCalendarEventId: string }
## props { userEmail: string, userName: string, appointmentStatus: AppointmentStatus, appointmentDate: string, appointmentTime: string, appointmentMode: AppointmentMode, userId: string, userAccessToken: string , providerAccessToken: string, bookingId: string }
KAFKA_PROVIDER_APPOINTMENT_STATUS=provider-appointment-status-change

# 7. user or provider third party app connected
## TODO send email ( email consumer )
## TODO send push notification ( push-notification consumer )
## TODO create inapp notification ( inapp-notification consumer )
## props { email: string, name: string, app: AppConnect, userOrProviderId: string }
KAFKA_APP_CONNECT=app-connect

# 8. provider trial subscription ( to provider )
## TODO send email ( email consumer )
## TODO create inapp notification ( inapp-notification consumer )
## TODO send push notification ( push-notification consumer )
## props { email: string, name: string, providerId: string , subscriptionStartDate: string, subscriptionEndDate: string }
KAFKA_PROVIDER_TRIAL_SUBSCRIPTION=provider-trial-subscription

# 9. provider subscription payment success event
## TODO send email to provider ( email consumer )
## TODO create notification ( inapp-notification consumer )
## TODO send push notification to provider
## props { subscriptionId: string, providerId: string, name: string, email: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS=provider-subscription-payment-success

# 10. user booking created event
## TODO send email to user payment success ( email consumer )
## TODO create notification ( inapp-notification consumer )
## TODO send email to provider got new appointment ( email consumer )
## TODO send push notification to provider ( push-notification consumer )
## props { bookingId: string, userId: string, userName: string , userEmail: string, providerName: string, providerEmail: string }
KAFKA_USER_BOOKING_CREATED=user-booking-created

# 11. provider payout payment success event
## TODO send email to provider ( email consumer )
## TODO send push notification ( push-notification consumer )
## TODO create notification ( inapp-notification consumer )
## props { providerId: string, name: string, email: string }
KAFKA_PROVIDER_PAYOUT_SUCCESS=provider-payout-success

# 12. user cancel booking success event
## TODO send email to user ( email consumer )
## TODO create notification for user ( inapp-notification consumer )
## TODO create notification for provider ( inapp-notification consumer )
## TODO send push notification for provider ( push-notification consumer )
## TODO update calendar events with new status ( google-calendar consumer )
    ## if calendar events updation failed
    ## TODO create notification for user ( notification consumer )
    ## TODO send push notification to provider ( push-notification consumer )
## props { bookingId: string, paymentId: string, userId: string , providerId: string , userEmail: string , userName: string, appointmentStatus: AppointmentStatus, userAccessToken: string, providerAccessToken: string }
KAFKA_USER_CANCEL_BOOKING_SUCCESS=user-cancel-booking-success




###### PS ######

#### kafka topics for PS to publish ####

# 1. provider subscription payment success event => PS -> MBS & NS
## payload { subscriptionId: string, providerId: string, name: string, email: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS=provider-subscription-payment-success

# 2. provider subscription payment failed event => PS -> MBS 
## payload { transactionId: string, paymentStatus: paymentStatus, paymentMethod: paymentMethod, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, subscriptionId: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_FAILED=provider-subscription-payment-failed

# 3. user booking payment success event => PS -> MBS & NS
## payload { bookingId: string, name: string, email: string, paymentId: string, , providerName: string, providerEmail: string }
KAFKA_USER_BOOKING_PAYMENT_SUCCESS=user-booking-payment-success

# 4. user booking payment failed event => PS -> MBS 
## payload { bookingId: string, name: string, email: string, paymentId: string, , providerName: string, providerEmail: string }
KAFKA_USER_BOOKING_PAYMENT_FAILED=user-booking-payment-failed

# 5. provider payout payment success event => PS -> MBS & NS
## payload { providerId: string, name: string, email: string }
KAFKA_PROVIDER_PAYOUT_SUCCESS=provider-payout-success

# 6. provider payout payment failed event => PS -> MBS
## payload { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, retyr: boolean , retryCount: number }
KAFKA_PROVIDER_PAYOUT_FAILED=provider-payout-failed

# 7. user cancel booking success event => PS -> MBS & NS
## payload { bookingId: string, name: string, email: string, paymentId: string, , providerName: string, providerEmail: string }
KAFKA_USER_CANCEL_BOOKING_SUCCESS=user-cancel-booking-success

# 8. user cancel booking failed event => PS -> MBS 
## payload { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, userId: string, providerId: string, bookingId: string  }
KAFKA_USER_CANCEL_BOOKING_FAILED=user-cancel-booking-failed




#### kafka topics for PS to subscribe ####

# 1. provider subscription payment
## TODO create payment
## props { transactionId: string, paymentStatus: paymentStatus, paymentMethod: paymentMethod, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, subscriptionId: string, name: string, email: string }
## if success then publish 
    ## KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS=provider-subscription-payment-success    => PS -> MBS & NS
    ## payload { subscriptionId: string, providerId: string, name: string, email: string }
## if failed then publish 
    ## KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_FAILED=provider-subscription-payment-failed   => PS -> MBS
    ## payload { transactionId: string, paymentStatus: paymentStatus, paymentMethod: paymentMethod, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, subscriptionId: string }
KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT=provider-subscription-payment

# 2 . user booking payment initiated event
## TODO create payment
## props { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, userId: string, providerId: string, bookingId: string, name: string, email: string  }
## if success then publish 
    ## KAFKA_USER_BOOKING_PAYMENT_SUCCESS=user-booking-payment-success  => PS -> MBS
    ## payload { bookingId: string, name: string, email: string, paymentId: string, , providerName: string, providerEmail: string }
## if failed then publish 
    ## KAFKA_USER_BOOKING_PAYMENT_FAILED=user-booking-payment-failed     => PS -> MBS
    ## payload { bookingId: string, name: string, email: string, paymentId: string, , providerName: string, providerEmail: string }
KAFKA_USER_BOOKING_INITIATED=user-booking-initiated

# 3. provider payout payment event
## TODO create payment
## props { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string }
## if success then publish
    ## KAFKA_PROVIDER_PAYOUT_SUCCESS=provider-payout-success => PS -> MBS(optional for updating future collection of payout) & NS
    ## payload { providerId: string, name: string, email: string }
## if failed then publish
    ## KAFKA_PROVIDER_PAYOUT_FAILED=provider-payout-failed => PS -> MBS
    ## payload { transactionId: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethods, paymentGateway: PaymentGateway, paymentFor: PaymentFor, initialAmount: number, discountAmount: number, totalAmount: number, providerId: string, retyr: boolean , retryCount: number }
KAFKA_PROVIDER_PAYOUT=provider-payout

# 4. user cancel booking event
## TODO update payment
## props { bookingId: string, paymentId?: string, userId: string , providerId: string , userEmail: string , userName: string }
## if success then publish
    ## KAFKA_USER_CANCEL_BOOKING_SUCCESS=user-cancel-booking-success => PS -> MBS & NS
    ## payload { bookingId: string, paymentId: string, userId: string , providerId: string , userEmail: string , userName: string }
## if failed then publish
    ## KAFKA_USER_CANCEL_BOOKING_FAILED=user-cancel-booking-failed => PS -> MBS
    ## payload { bookingId: string, paymentId: string, userId: string , providerId: string , userEmail: string , userName: string }
KAFKA_USER_CANCEL_BOOKING=user-cancel-booking