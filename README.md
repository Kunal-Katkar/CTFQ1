
```
+----------------+     image, parameters      +------------------------------+
|                | -------------------------> |                              |
|     User       |                            |  RGB Image Dimensionality    |
|                | <------------------------- |      Reduction System        |
+----------------+    processed_image,        |                              |
                         metrics,             +------------------------------+
                      download_link                |                  ^
                                                   |                  |
                                          monitor_command      system_status
                                          user_management          logs
                                                   |                  |
                                                   v                  |
+----------------+                                 |                  |
|                |                                 |                  |
|  Administrator | <-------------------------------+                  |
|                |                                                   |
+----------------+                                                   |
                                                                     |
                                                                     v
```

**External Entities**: User, Administrator

**Data Flows**:
- **User to System**: image, parameters
- **System to User**: processed_image, metrics, download_link
- **Administrator to System**: monitor_command, user_management
- **System to Administrator**: system_status, logs

---

### Level 1 DFD

Level 1 DFD decomposes the system into 7 processes and 4 data stores, with data flows between them.

```
+-----------+   credentials    +-----------------+
|           | ---------------> | 0.1 Authenticate|
|   User    |                  |     User        |
|           | <--------------- |                 |
+-----------+   auth_status    +-----------------+
      |                              | 
      | image, parameters, session_id | 
      |                              | 
      v                              v
+-----------------+           +-----------------+
| 0.2 Upload Image|           |      D1         |
|   and Validate  | --------> |    UserDB       |
+-----------------+           +-----------------+
      |                              |
      | validated_image              |
      |                              |
      v                              v
+-----------------+           +-----------------+
| 0.3 Process     |           |      D2         |
| Image with CAE  | --------> |    ImageDB      |
+-----------------+           +-----------------+
      |                              |
      | processed_data               |
      |                              |
      v                              v
+-----------------+           +-----------------+
| 0.4 Calculate   |           |      D3         |
|    Metrics      | --------> |    JobQueue     |
+-----------------+           +-----------------+
      |                              |
      | metrics                      |
      |                              |
      v                              v
+-----------------+           +-----------------+
| 0.5 Generate    |           |      D4         |
|    Output       | --------> |   AuditLogs     |
+-----------------+           +-----------------+
      |                              |
      | processed_image, metrics,    |
      | download_link                |
      |                              |
      v                              v
+-----------+                       +-----------+
|   User    |                       | Administrator
+-----------+                       +-----------+
```

**Processes**:
- **0.1 Authenticate User**: Handles user authentication
- **0.2 Upload Image and Validate**: Validates and stores uploaded images
- **0.3 Process Image with CAE**: Processes images using the CAE model
- **0.4 Calculate Metrics**: Computes PSNR and SSIM metrics
- **0.5 Generate Output**: Prepares results for download
- **0.6 Manage Users**: Handles user management (admin)
- **0.7 Monitor System**: Monitors system health (admin)

**Data Stores**:
- **D1: UserDB**: Stores user credentials and sessions
- **D2: ImageDB**: Stores image metadata
- **D3: JobQueue**: Stores job status and details
- **D4: AuditLogs**: Stores system logs

**Data Flows**:
- User to 0.1: credentials
- 0.1 to User: auth_status
- 0.1 to D1: user_session
- 0.1 to D4: login_log
- User to 0.2: image, parameters, session_id
- 0.2 to D1: read session_id (validation)
- 0.2 to D2: image_metadata
- 0.2 to D3: job_data
- 0.2 to D4: upload_log
- 0.2 to 0.3: validated_image
- 0.3 to D2: processed_image_metadata
- 0.3 to D3: job_status
- 0.3 to D4: processing_log
- 0.3 to 0.4: processed_data
- 0.4 to D3: metrics_data
- 0.4 to D4: metrics_log
- 0.4 to 0.5: metrics
- 0.5 to D2: output_image_path
- 0.5 to D3: job_completion
- 0.5 to D4: output_log
- 0.5 to User: processed_image, metrics, download_link
- Administrator to 0.6: user_management_command
- 0.6 to D1: user_data
- 0.6 to D4: user_management_log
- 0.6 to Administrator: user_management_response
- Administrator to 0.7: monitor_command
- 0.7 to D3: read job_data
- 0.7 to D4: read log_data
- 0.7 to Administrator: system_status

---

### Level 1 DFD (Visual Format with Circles and Rectangles)

```
                    ┌─────────────┐
                    │    User     │
                    └─────────────┘
                           │
                    credentials
                           │
                           ▼
                    ┌─────────────┐
                    │ 0.1 Auth    │◄───┐
                    │   User      │    │
                    └─────────────┘    │
                           │           │
                    auth_status        │
                           │           │
                           ▼           │
                    ┌─────────────┐    │
                    │ 0.2 Upload  │    │
                    │   Image     │    │
                    └─────────────┘    │
                           │           │
                    validated_image     │
                           │           │
                           ▼           │
                    ┌─────────────┐    │
                    │ 0.3 Process │    │
                    │ Image CAE   │    │
                    └─────────────┘    │
                           │           │
                    processed_data      │
                           │           │
                           ▼           │
                    ┌─────────────┐    │
                    │ 0.4 Calc    │    │
                    │  Metrics    │    │
                    └─────────────┘    │
                           │           │
                    metrics            │
                           │           │
                           ▼           │
                    ┌─────────────┐    │
                    │ 0.5 Generate│    │
                    │   Output    │    │
                    └─────────────┘    │
                           │           │
                    processed_image,   │
                    metrics,           │
                    download_link      │
                           │           │
                           ▼           │
                    ┌─────────────┐    │
                    │    User     │    │
                    └─────────────┘    │
                                       │
                    ┌─────────────┐    │
                    │     D1      │    │
                    │   UserDB    │────┘
                    └─────────────┘
                           ▲
                           │
                    ┌─────────────┐
                    │     D2      │
                    │  ImageDB    │
                    └─────────────┘
                           ▲
                           │
                    ┌─────────────┐
                    │     D3      │
                    │  JobQueue   │
                    └─────────────┘
                           ▲
                           │
                    ┌─────────────┐
                    │     D4      │
                    │ AuditLogs   │
                    └─────────────┘
                           ▲
                           │
                    ┌─────────────┐
                    │Administrator│
                    └─────────────┘
```

---

### Level 2 DFD for Process 0.3 (Process Image with CAE)

```
                    ┌─────────────┐
                    │    0.2      │
                    │Upload Image │
                    └─────────────┘
                           │
                    validated_image
                           │
                           ▼
                    ┌─────────────┐
                    │ 0.3.1 Pre   │
                    │  process    │
                    │   Image     │
                    └─────────────┘
                           │
                    normalized_image
                           │
                           ▼
                    ┌─────────────┐
                    │ 0.3.2 Encode│
                    │Image to Lat │
                    │   Space     │
                    └─────────────┘
                           │
                    latent_vector
                           │
                           ▼
                    ┌─────────────┐
                    │ 0.3.3 Decode│
                    │Lat Space to │
                    │   Image     │
                    └─────────────┘
                           │
                    reconstructed_image
                           │
                           ▼
                    ┌─────────────┐
                    │ 0.3.4 Store │
                    │  Results    │
                    └─────────────┘
                           │
                    processed_data
                           │
                           ▼
                    ┌─────────────┐
                    │    0.4      │
                    │Calculate    │
                    │  Metrics    │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    0.5      │
                    │  Generate   │
                    │   Output    │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │     D2      │
                    │  ImageDB    │
                    └─────────────┘
                           ▲
                           │
                    ┌─────────────┐
                    │     D3      │
                    │  JobQueue   │
                    └─────────────┘
                           ▲
                           │
                    ┌─────────────┐
                    │     D4      │
                    │ AuditLogs   │
                    └─────────────┘
```

---

## Structure Chart

The Structure Chart is derived using transaction analysis, based on the Level 1 DFD. It shows the module hierarchy and invocations.

```
                            MAIN SYSTEM
                                │
                ┌───────────────┼───────────────┼─────────────────┐
                │               │               │                 │
    Image Processing     User Management     System Monitoring     │
    Transaction (IPT)    Transaction (UMT)   Transaction (SMT)     │
                │               │               │                 │
        ┌───────┴───────┐   ┌───┴───┐       ┌───┴───┐             │
        │               │   │       │       │       │             │
    Authenticate     Upload    Manage     Monitor    Monitor    │   │
        User         Image     Users       System     System    │   │
        │               │       │           │           │       │   │
    ┌───┴───┐       ┌───┴───┐   │           │           │       │   │
    │       │       │       │   │           │           │       │   │
 Preprocess Encode Decode Update │           │           │       │   │
 Image     Image   Image Job     │           │           │       │   │
            │       │   Status   │           │           │       │   │
        ┌───┴───┴───┴───┴───┐   │           │           │       │   │
        │       │       │       │           │           │       │   │
    Calculate Generate         │           │           │       │   │
    Metrics   Output           │           │           │       │   │
                                │           │           │       │   │
                                └───────────┴───────────┴───────┘
```
