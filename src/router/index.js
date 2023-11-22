import { createRouter, createWebHistory } from 'vue-router';


import Pagination from '@/components/payment/PaymentSuccessful.vue';




// import TermsOfUse from '../components/temp/PaymentPage';

const routes = [
    {
        path: '/pagination',
        name: 'Pagination',
        component: Pagination
    },


    {
        path: '/termsofuse',
        name: 'TermsOfUse',
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/account/TermsOfService.vue'),
        meta: {
            title: 'Retain - Terms Of Use',
        }
    },

    {
        path: '/',
        name: 'Login',
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/account/Login.vue'),
        meta: {
            title: 'Retain - Login',
        }
    },
    {
        path: '/publicresetpassword',
        name: 'PublicResetPassword',
        component: () =>
            import( /* webpackChunkName: "PublicResetPassword" */ '../views/account/PublicResetPassword.vue'),
        meta: {
            title: 'Retain - Admin Reset Password',
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import( /* webpackChunkName: "register" */ '../views/account/Register.vue'),
        meta: {
            title: 'Retain - Register',
        }
    },

    {
        path: '/onboarding',
        name: 'Onboarding',
        component: () =>
            import( /* webpackChunkName: "onboarding" */ '../views/account/OnboardingForm.vue'),
        meta: {
            title: 'Retain - Onboarding',
        }
    },
    {
        path: '/onboarding/step2',
        name: 'StartingPoint',
        component: () =>
            import( /* webpackChunkName: "startingpoint" */ '../views/onboarding/StartingPoint.vue'),
        meta: {
            title: 'Retain - Start Point',
        }
    },
    {
        path: '/next',
        name: 'StartingDashboard',
        component: () =>
            import( /* webpackChunkName: "startingdashboard" */ '../views/onboarding/StartingDashboard.vue'),
        meta: {
            title: 'Retain - Starting Board',
        }
    },
    {
        path: '/processing/:option',
        name: 'ProcessRequest',
        component: () =>
            import( /* webpackChunkName: "processrequest" */ '../views/onboarding/ProcessRequest.vue')
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        meta: {
            title: 'Retain - Forgot Password',
        },
        component: () =>
            import( /* webpackChunkName: "forgotpassword" */ '../views/account/ForgotPassword.vue')
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        meta: {
            title: 'Retain - Reset Password',
        },
        component: () =>
            import( /* webpackChunkName: "resetpassword" */ '../views/account/ResetPassword.vue')
    },
    {
        path: '/emailsent/:email',
        name: 'EmailSent',
        meta: {
            title: 'Retain - Reset Email Confirmation',
        },
        component: () =>
            import( /* webpackChunkName: "emailsent" */ '../views/account/EmailSent.vue')
    },

    {
        path: '/tenant',
        name: 'Home',
        component: () =>
            import( /* webpackChunkName: "home" */ '../views/dashboard/Home.vue'),
        children: [{
            path: '',
            name: 'Dashboard',
            component: () =>
                import( /* webpackChunkName: "dashboard" */ '../views/dashboard/ChurchDashboard.vue'),
            meta: {
                title: 'Retain - Dashboard',
                metaTags: [{
                    name: 'description',
                    content: 'The home page of Retain app.'
                },
                    // {
                    // property: 'og:description',
                    // content: 'The home page of our example app.'
                    // }
                ]
            }
        },

        {
            path: 'subscription',
            name: 'Subscription',
            meta: {
                title: 'Retain - Subscription',
            },
            component: () =>
                import( /* webpackChunkName: "dashboard" */ '../views/dashboard/Subscription.vue')
        },
        {
            path: 'contacts',
            name: 'Contacts',
            meta: {
                title: 'Retain - SMS Communication - Contacts',
            },
            component: () =>
                import( /* webpackChunkName: "contactlist" */ '@/views/communication/Contacts')
        },
        {
            path: 'contactsegment',
            name: 'ContactList',
            meta: {
                title: 'Retain - SMS Communication - Phone Groups',
            },
            component: () =>
                import( /* webpackChunkName: "contactlist" */ '@/views/communication/ContactList')
        },
        {
            path: 'report/:messageId',
            name: 'DeliveryReport',
            meta: {
                title: 'Churchplus - SMS Communication - Delivery Report',
            },
            component: () =>
                import( /* webpackChunkName: "deliveryreport" */ '@/views/communication/DeliveryReport')
        },
        {
            path: 'senderid',
            name: 'SenderId',
            meta: {
                title: 'Retain - Communication - Sender IDs',
            },
            component: () =>
                import( /* webpackChunkName: "contactlist" */ '@/views/communication/SenderID')
        },
        {
            path: 'wallets',
            name: 'Wallet',
            meta: {
                title: 'Retain - SMS - Wallet',
            },
            component: () =>
                import( /* webpackChunkName: "contactlist" */ '@/views/communication/Wallet')
        },
        {
            path: 'report',
            name: 'CommunicationReport',
            // component: () =>
            //     import( /* webpackChunkName: "smscommunication" */ '@/views/communication/SmsCommunication'),
            children: [
                {
                    path: 'sms',
                    name: 'SMSReport',
                    meta: {
                        title: 'Retain - SMS Report',
                    },
                    component: () =>
                        import( /* webpackChunkName: "inbox" */ '@/views/communication/SMSReport')
                },
                {
                    path: 'email',
                    name: 'EmailReport',
                    meta: {
                        title: 'Retain - Email Report',
                    },
                    component: () =>
                        import( /* webpackChunkName: "inbox" */ '@/views/communication/EmailReport')
                }
            ]
        },
        {
            path: 'settings',
            name: 'Settings',
            // component: () =>
            //     import( /* webpackChunkName: "smscommunication" */ '@/views/communication/SmsCommunication'),
            children: [
                {
                    path: 'profile',
                    name: 'AccountProfile',
                    meta: {
                        title: 'Retain - Account Profile',
                    },
                    component: () =>
                        import( /* webpackChunkName: "inbox" */ '@/views/communication/AccountProfile')
                },
                {
                    path: 'changepassword',
                    name: 'ChangePassword',
                    meta: {
                        title: 'Retain - Change Password',
                    },
                    component: () =>
                        import( /* webpackChunkName: "inbox" */ '@/views/communication/ChangePassword')
                },
                {
                    path: 'apisetting',
                    name: 'APISetting',
                    meta: {
                        title: 'Retain - API Key Settings',
                    },
                    component: () =>
                        import( /* webpackChunkName: "inbox" */ '@/views/communication/APISetting')
                },
            ]
        },
        {
            path: 'sms',
            name: 'SmsCommunication',
            component: () =>
                import( /* webpackChunkName: "smscommunication" */ '@/views/communication/SmsCommunication'),
            children: [{
                path: '',
                name: 'Inbox',
                meta: {
                    title: 'Retain - SMS Inbox',
                },
                component: () =>
                    import( /* webpackChunkName: "inbox" */ '@/views/communication/MessageInbox')
            },
            {
                path: 'sent',
                name: 'SentMessages',
                meta: {
                    title: 'Retain - SMS Communication - Sent Messages',
                },
                component: () =>
                    import( /* webpackChunkName: "sentmessages" */ '@/views/communication/SentMessages'),
            },
            {
                path: 'draft',
                name: 'DraftMessages',
                meta: {
                    title: 'Retain - SMS Communication - Drafts',
                },
                component: () =>
                    import( /* webpackChunkName: "draftmessages" */ '@/views/communication/DraftMessages')
            },
            // {
            //     path: 'contacts',
            //     name: 'ContactList',
            //     meta: {
            //         title: 'Retain - SMS Communication - Phone Groups',
            //     },
            //     component: () =>
            //         import( /* webpackChunkName: "contactlist" */ '@/views/communication/ContactList')
            // },
            {
                path: 'sent/:messageId',
                name: 'MessageDetails',
                meta: {
                    title: 'Retain - SMS Communication - Message Details',
                },
                component: () =>
                    import( /* webpackChunkName: "contactlist" */ '@/views/communication/MessageDetails')
            },
            {
                path: 'buyunit',
                name: 'BuyUnitSms',
                meta: {
                    title: 'Retain - SMS Communication - Buy SMS Unit',
                },
                component: () =>
                    import( /* webpackChunkName: "Buy unit" */ '@/views/communication/BuyUnitSms')
            },
            {
                path: 'senderids',
                name: 'SenderIDSms',
                meta: {
                    title: 'Retain - SMS Communication - Buy SMS Unit',
                },
                component: () =>
                    import( /* webpackChunkName: "Buy unit" */ '@/views/communication/SenderIDSms')
            },
            {
                path: 'compose',
                name: 'SendMessage',
                meta: {
                    title: 'Retain - SMS Communication - Compose message',
                },
                component: () =>
                    import( /* webpackChunkName: "sendmessage" */ '@/views/communication/SendSms')
            },
            {
                path: 'template',
                name: 'SMSTemplate',
                meta: {
                    title: 'Retain - SMS Communication - SMS Template',
                },
                component: () =>
                    import( /* webpackChunkName: "smstemplate" */ '@/views/communication/SMSTemplate')
            },
            {
                path: 'url',
                name: 'URLShortner',
                meta: {
                    title: 'Retain - SMS - URL Shortner',
                },
                component: () =>
                    import( /* webpackChunkName: "contactlist" */ '@/views/communication/URLShortner')
            },
            {
                path: 'scheduled',
                name: 'ScheduledSMS',
                meta: {
                    title: 'Retain - SMS Communication - Scheduled',
                },
                component: () =>
                    import( /* webpackChunkName: "scheduled" */ '@/views/communication/ScheduledSMS')
            }
            ]
        },
        {
            path: 'email',
            name: 'EmailCommunication',
            component: () =>
                import( /* webpackChunkName: "emailcommunication" */ '@/views/communication/EmailCommunication'),
            children: [{
                path: '',
                name: 'Sent',
                meta: {
                    title: 'Retain - Email Communication - Sent Emails',
                },
                component: () =>
                    import( /* webpackChunkName: "sentemails" */ '@/views/communication/SentEmails')
            },
            {
                path: 'sent',
                name: 'SentEmails',
                meta: {
                    title: 'Retain - Email Communication - Sent Emails',
                },
                component: () =>
                    import( /* webpackChunkName: "sentemails" */ '@/views/communication/SentEmails')
            },
            {
                path: 'sent/:messageId',
                name: 'EmailDetails',
                meta: {
                    title: 'Retain - Email Communication - Email Details',
                },
                component: () =>
                    import( /* webpackChunkName: "emaildetails" */ '@/views/communication/EmailDetails')
            },
            {
                path: 'draft',
                name: 'EmailDraft',
                meta: {
                    title: 'Retain - Email Communication - Email Drafts',
                },
                component: () =>
                    import( /* webpackChunkName: "emaildraft" */ '@/views/communication/EmailDraft')
            },
            // { path: 'contacts', name: 'ContactList', component: ContactList },
            // { path: 'report', name: 'DeliveryReport', component: DeliveryReport },
            {
                path: 'compose',
                name: 'ComposeEmail',
                meta: {
                    title: 'Retain - Email Communication - Compose',
                },
                component: () =>
                    import( /* webpackChunkName: "compose" */ '@/views/communication/ComposeEmail')
            },
            {
                path: 'schedules',
                name: 'Schedules',
                meta: {
                    title: 'Retain - Email Communication - Scheduled',
                },
                component: () =>
                    import( /* webpackChunkName: "compose" */ '@/views/communication/ScheduledEmails')
            }
            ]
        },
        {
            path: 'whatsapp',
            name: 'Whatsapp',
            meta: {
                title: 'Retain - Whatsapp Communication',
            },
            component: () =>
                import( /* webpackChunkName: "whatsappmodule" */ '@/components/whatsapp/whatsapp'),
            children: [
                {
                    path: 'auth',
                    name: 'ConnectWhatsapp',
                    meta: {
                        title: 'Retain - Connect Whatsapp',
                    },
                    component: () =>
                        import( /* webpackChunkName: "connectwhatsapp" */ '@/views/communication/whatsapp/ConnectWhatsapp')
                },
                {
                    path: '',
                    name: 'Compose',
                    meta: {
                        title: 'Retain - Whatsapp Compose',
                    },
                    component: () =>
                        import( /* webpackChunkName: "composewhatsapp" */ '@/views/communication/whatsapp/composeWhatsapp')
                },
                {
                    path: 'scheduledmessages',
                    name: 'ScheduledList',
                    meta: {
                        title: 'Retain - Whatsapp Scheduled Messages',
                    },
                    component: () =>
                        import( /* webpackChunkName: "scheduledwhatsapp" */ '@/views/communication/whatsapp/ScheduledList')
                }
            ]
        },
        {
            path: 'voice',
            name: 'Voice',
            meta: {
                title: 'Retain - Voice Communication',
            },
            component: () =>
                import( /* webpackChunkName: "voicemodule" */ '@/components/Voice/Voice'),
            children: [
                {
                    path: 'voicelist',
                    name: 'VoiceList',
                    meta: {
                        title: 'Retain -Voice List',
                    },
                    component: () =>
                        import( /* webpackChunkName: "voicelist" */ '@/views/communication/Voice/VoiceList')
                },
                {
                    path: 'sendvoicemessage',
                    name: 'composeVoice',
                    meta: {
                        title: 'Retain - Send Voice Message',
                    },
                    component: () =>
                        import( /* webpackChunkName: "sendvoicemessage" */ '@/views/communication/Voice/composeVoice')
                },
                // {
                //     path: 'report/:messageId',
                //     name: 'VoiceDeliveryReport',
                //     meta: {
                //         title: 'Retain - Voice Communication - Delivery Report',
                //     },
                //     component: () =>
                //         import( /* webpackChunkName: "deliveryreport" */ '@/views/communication/DeliveryReport')
                // },
            ]
        },
        {
            path: 'people',
            component: () =>
                import( /* webpackChunkName: "people" */ '../views/people/People.vue'),
            children: [

                {
                    path: '',
                    meta: {
                        title: 'Retain - Church Members',
                    },
                    component: () =>
                        import( /* webpackChunkName: "peopleempty" */ '../views/people/PeopleEmpty.vue')
                },
                {
                    path: 'import',
                    meta: {
                        title: 'Retain - Import Members',
                    },
                    component: () =>
                        import( /* webpackChunkName: "importpeople" */ '../views/people/ImportPeople.vue'),
                    name: 'ImportPeople'
                },
                {
                    path: 'add/:personId?',
                    name: 'AddPerson',
                    meta: {
                        title: 'Retain - Member Form',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addperson" */ '../views/people/AddPerson.vue')
                }
            ]

        },
        {
            path: 'units',
            name: 'BuyUnits',
            meta: {
                title: 'Retain - Purchase SMS Units',
            },
            component: () =>
                import( /* webpackChunkName: "buyunits" */ '@/views/payment/BuyUnits')
        },
        {
            path: 'addgroup',
            name: 'Phongroup',
            meta: {
                title: 'Retain - Create | Edit Phone Group',
            },
            component: () =>
                import( /* webpackChunkName: "phonegroup" */ '@/views/communication/PhoneGroup')
        },
        {
            path: 'editcontact/:groupId',
            name: 'EditContactList',
            meta: {
                title: 'Retain - SMS Communication - Edit Phone group',
            },
            component: () =>
                import( /* webpackChunkName: "editcontactlist" */ '@/views/communication/EditGroup')
        },
        {
            path: 'peoplegroups:actionType?',
            name: 'Groups',
            meta: {
                title: 'Retain - Groups',
            },
            component: () =>
                import( /* webpackChunkName: "groups" */ '@/views/groups/GroupsList')
        },
        {
            path: 'sidemodal',
            name: 'SideModal',
            meta: {
                title: 'Retain - Groups',
            },
            component: () =>
                import( /* webpackChunkName: "groups" */ '@/views/groups/sidemodal/SideModal.vue')
        },
        {
            path: 'createpeoplegroup/:groupId?',
            name: 'CreateGroup',
            meta: {
                title: 'Retain - Create | Edit Group',
            },
            component: () =>
                import( /* webpackChunkName: "createpeoplegroup" */ '@/views/groups/CreateGroup')
        },
        {
            path: 'importinstruction',
            name: 'ImportInstruction',
            meta: {
                title: 'Retain - Import Members',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/people/ImportInstruction.vue')
        },
        {
            path: 'workflow',
            name: 'WorkFlow',
            component: () =>
                import( /* webpackChunkName: "workflow" */ '../views/workflow/Index.vue'),
            meta: {
                title: 'Retain - Ministry Workflow',
            },
            children: [{
                path: 'list',
                name: 'Workflows',
                component: () =>
                    import( /* webpackChunkName: "workflows" */ '../views/workflow/pages/Workflows.vue'),
                meta: {
                    title: 'Retain - Add Workflow',
                }
            },
            {
                path: 'add',
                name: 'AddWorkflow',
                component: () =>
                    import( /* webpackChunkName: "addworkflow" */ '../views/workflow/components/MainBoard.vue'),
                meta: {
                    title: 'Retain - Add Workflow',
                }
            },
            ]
        },
        {
            path: 'media',
            name: 'MediaLibrary',
            component: () =>
                import( /* webpackChunkName: "medialibrary" */ '@/views/media/library/Index'),
            children: [{
                path: '',
                name: 'Gallery',
                meta: {
                    title: 'Retain - Media Gallery',
                },
                component: () =>
                    import( /* webpackChunkName: "medialibrary" */ '@/views/media/library/components/Gallery')
            },
            {
                path: 'file',
                name: 'FileDetails',
                meta: {
                    title: 'Retain - Media Library',
                },
                component: () =>
                    import( /* webpackChunkName: "medialibrary" */ '@/views/media/file/Index')
            },
            ]
        },
        {
            path: 'upload',
            name: 'UploadMedia',
            meta: {
                title: 'Retain - Upload Media',
            },
            component: () =>
                import( /* webpackChunkName: "uploadmedia" */ '@/views/media/upload/Index')
        },
        {
            path: 'payments/:editPayment?',
            name: 'PaymentTransaction',
            meta: {
                title: 'Retain - Payment',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/PaymentTransaction')
        },
        {
            path: 'paymentoptions/:paymentId',
            name: 'PaymentOption',
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/PaymentOption')
        },
        {
            path: 'payment',
            name: 'Payment',
            meta: {
                title: 'Retain - Payment',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/Payment')
        }
        ],
    },
    {
        path: '/pricing',
        name: 'PricingPage',
        meta: {
            title: 'Retain - Pricing ',
        },
        component: () =>
            import( /* webpackChunkName: "dashboard" */ '../views/dashboard/PricingPage.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/signuppayment/:userId?',
        name: 'SignUpPayment',
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/SignUpPayment')
    },
    {
        path: '/signinpayment/:userId?',
        name: 'SignInPayment',
        meta: {
            title: 'Retain - Payment',
        },
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/SignInPayment')
    },
    {
        path: '/transactionpage/:userId?',
        name: 'TransactionPage',
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/TransactionPage')
    },
    {
        path: '/errorpage',
        name: 'errorpage',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/PageError'),
        children: [{
            path: 'expiredSubscription',
            name: 'ExpiredSubscription',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/ExpiredSubscription'),
        },
        {
            path: 'unauthorized',
            name: 'Unauthorized',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/Unauthorized')
        },
        {
            path: 'member-capacity-reached',
            name: 'MemberMaxCap',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/MemberMaxCap')
        }
        ]
    },
    {
        path: '/subexpired',
        name: 'subexpired',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/expiredpages/SubExpired'),

    },
    {
        path: '/sendsmsexpired',
        name: 'SendSmsExpired',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/expiredpages/SendSmsExpired'),

    },
    {
        path: '/buyunitsexpired',
        name: 'BuyUnitsExpired',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/expiredpages/BuyUnitsExpired'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {

    const checkinToken = localStorage.getItem('checkinToken')
    if ((to.name === "CheckinSignUp" || to.name === "CheckinSignin") && checkinToken) {
        return next({ name: 'CheckinDashboard' })
    }

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("roles") ? JSON.parse(localStorage.getItem("roles")) : ''
    const tokenIsValid = token && token.length > 30 ? true : false;
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    if ((to.name === "ResetPassword" ||
        to.name === "EmailSent" ||
        to.name === "OnboardingForm" ||
        to.name === "WebCheckin" ||
        to.name === "OnlineGiving4" ||
        to.name === "Pay" ||
        to.name === "iFrame" ||
        to.name === "SignUpPayment" ||
        to.name === "SignInPayment" ||
        to.name === "TransactionPage" ||
        to.name === "PublicResetPassword" ||
        to.name === "PublicPerson" ||
        to.name === "PublicFirstTimer" ||
        to.name === "PublicNewConvert" ||
        to.name === "EventRegistration" ||
        to.name === "PricingPage" ||
        to.name === "PublicPledgePayment") && !tokenIsValid) return next(true)


    if ((to.name !== "Login" && to.name !== "Register") && to.name !== "Onboarding" && to.name !== "StartingPoint" && to.name !== "ForgotPassword" && to.name !== "ResetPassword" && to.name !== "TermsOfUse" && (!token || token.length < 30)) return next("/")
    if ((to.name === "Login" || to.name === "Register") && tokenIsValid) return next("/tenant")

    if ((role && role.length === 1 && role[0] === "FollowUp" && token) && (to.path !== "/tenant/followup" && to.name !== "FirsttimerManagement")) {
        localStorage.removeItem('token')
        next("/")
    }
    else {
        next(true)
    }
    next(true)


    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

})

router.onError((error) => {
    console.log(error, 'router error')
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});



export default router