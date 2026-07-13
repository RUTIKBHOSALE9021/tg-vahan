# Certificates feature

Covers: **Search Certificate**, **Regenerate QR**, **Cert List Vs Brand**,
**Cert List Vs Users**.

Suggested structure:

```
certificates/
├── pages/            # SearchCertificatePage.jsx, RegenerateQrPage.jsx, CertByBrandPage.jsx
├── components/       # CertificateTable.jsx, CertificateFilters.jsx, QrPreview.jsx
└── certificatesApi.js  # useSearchCertificatesQuery, useRegenerateQrMutation, ...
```

Use the `Certificate` cache tag (declared in baseApi) for invalidation.
