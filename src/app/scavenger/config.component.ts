import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { __values } from 'tslib';
import { utf8Encode } from '@angular/compiler/src/util';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configForm: FormGroup;

  validationMessages = {
    url: {
      required: 'URL and port number are required.',
      pattern: 'The provided URL does not comply to the required URL format.',
    },
    account_id: {
      required: 'The numeric account ID is required.',
      min: 'The numeric account ID canot be less than 0.',
      max: 'The numeric account ID cannot be greater than 18446744073709551616.',
      pattern: 'The numeric account ID can contain only numbers between 0 and 9.',
      duplicates: 'Duplicate account IDs are not allowed.',
    },
    passphrase: {
      required: 'The passphrase is required.',
      minlength: 'The passphrase has to contain at least 1 character.',
      maxlength: 'The passphrase cannot contain more than 300 characters.',
      duplicates: 'Duplicate passphrases are not allowed.',
    },
    plot_dirs: {
      required: 'Directories containing plot files have to be provided.',
      duplicates: 'Duplicate plot directories are not allowed.',
      allspace: 'Blank entries are not allowed.',
      invalidpath: 'The provided path is invalid.'
    },
    hdd_reader_thread_count: {
      required: 'The number of HDD reader threads has to be provided.',
      pattern: 'The number of HDD reader threads has to be a non-negative integer.',
    },
    hdd_use_direct_io: {
      required: 'The setting is required.',
    },
    hdd_wake_up_after: {
      required: 'The HDD wake-up setting is required.',
      pattern: 'The setting has to be a non-negative integer.',
    },
    cpu_threads: {
      required: 'The CPU threads number setting is required.',
      pattern: 'The CPU threads number has to be a non-negative integer.',
    },
    cpu_worker_task_count: {
      required: 'The number of CPU worker tasks is required.',
      pattern: 'The number of CPU worker tasks has to be a non-negative integer.',
    },
    cpu_nonces_per_cache: {
      required: 'The CPU nonces per cache setting is required.',
      pattern: 'The CPU nonces per cache has to be a non-negative integer.',
    },
    cpu_thread_pinning: {
      required: 'CPU thread pinning is a required setting.',
    },
    gpu_threads: {
      required: 'Setting the number of GPU threads is mandatory.',
      pattern: 'The GPU thread number has to be a non-negative integer.',
    },
    gpu_worker_task_count: {
      required: 'The GPU worker task number is a mandatory setting.',
      pattern: 'The GPU worker task number has to be a non-negative integer.',
    },
    gpu_platform: {
      required: 'The GPU platform number is a required setting.',
      pattern: 'The GPU platform has to be a non-negative integer.',
    },
    gpu_device: {
      required: 'The GPU device setting is required.',
      pattern: 'The GPU device setting has to be a non-negative integer.',
    },
    gpu_nonces_per_cache: {
      required: 'The GPU nonces per cache setting is required.',
      pattern: 'The GPU nonces per cache setting has to be a non-negative integer.',
    },
    gpu_mem_mapping: {
      required: 'The GPU memory mapping setting is required.',
    },
    gpu_async: {
      required: 'The GPU async setting is required.',
    },
    target_deadline: {
      pattern: 'The target deadline has to be a non-negative integer.',
    },
    account_id_dl: {
      required: 'The numeric account ID setting is required.',
      min: 'The numeric account ID canot be less than 0.',
      max: 'The numeric account ID cannot be greater than 18446744073709551616.',
      pattern: 'The numeric account ID can contain only numbers between 0 and 9.',
      duplicates: 'Duplicate account IDs are not allowed.',
    },
    target_deadline_dl: {
      required: 'The target deadline for the provided numeric account ID is required.',
      minlength: 'The target deadline for the provided numeric account ID is required.',
      maxlength: 'The target deadline length cannot exceed the length of 20.',
      pattern: 'The target deadline has to be a non-negative integer.',
    },
    get_mining_info_interval: {
      required: 'The setting is required.',
      pattern: 'The setting has to be a non-negative integer.',
    },
    timeout: {
      required: 'The timeout setting is required.',
      pattern: 'The timeout has to be a non-negative integer.',
    },
    send_proxy_details: {
      required: 'The setting is required.',
    },
    console_log_level: {
      required: 'The setting is required.',
    },
    logfile_log_level: {
      required: 'The setting is required.',
    },
    logfile_max_count: {
      required: 'The number of log files to keep setting is required.',
      pattern: 'The number of log files to keep has to be a non-negative integer.',
    },
    logfile_max_size: {
      required: 'The maximum size of a log file setting is required.',
      pattern: 'The maximum size of a log file has to be a non-negative integer.',
    },
    console_log_pattern: {
      required: 'The console log pattern is a mandatory setting.'
    },
    logfile_log_pattern: {
      required: 'The logfile log pattern is a mandatory setting.'
    },
    show_progress: {
      required: 'The setting is required.',
    },
    show_drive_stats: {
      required: 'The setting is required.',
    },
    benchmark_only: {
      required: 'The setting is required.',
    },
    header_key: {
      required: 'The additional header key value is required.'
    },
    header_value: {
      required: 'The additional header value is required.'
    }
  };

  formErrors = {
    display: '',
    url: '',
    account_id: '',
    passphrase: '',
    plot_dirs: '',
    hdd_reader_thread_count: '',
    hdd_use_direct_io: '',
    hdd_wake_up_after: '',
    cpu_threads: '',
    cpu_worker_task_count: '',
    cpu_nonces_per_cache: '',
    cpu_thread_pinning: '',
    gpu_threads: '',
    gpu_worker_task_count: '',
    gpu_platform: '',
    gpu_device: '',
    gpu_nonces_per_cache: '',
    gpu_mem_mapping: '',
    gpu_async: '',
    target_deadline: '',
    account_id_dl: '',
    target_deadline_dl: '',
    get_mining_info_interval: '',
    timeout: '',
    send_proxy_details: '',
    console_log_level: '',
    logfile_log_level: '',
    logfile_max_count: '',
    logfile_max_size: '',
    console_log_pattern: '',
    logfile_log_pattern: '',
    show_progress: '',
    show_drive_stats: '',
    benchmark_only: '',
    header_key: '',
    header_value: ''
  };

  formInfo = {
    display: '',
    url: '',
    account_id: '',
    passphrase: '',
    plot_dirs: '',
    hdd_reader_thread_count: '',
    hdd_use_direct_io: '',
    hdd_wake_up_after: '',
    miners_off: '',
    cpu_threads: '',
    cpu_worker_task_count: '',
    cpu_nonces_per_cache: '',
    cpu_thread_pinning: '',
    gpu_threads: '',
    gpu_worker_task_count: '',
    gpu_platform: '',
    gpu_device: '',
    gpu_nonces_per_cache: '',
    gpu_mem_mapping: '',
    gpu_async: '',
    target_deadline: '',
    account_id_dl: '',
    target_deadline_dl: '',
    get_mining_info_interval: '',
    timeout: '',
    send_proxy_details: '',
    console_log_level: '',
    logging_settings: '',
    logfile_log_level: '',
    logfile_max_count: '',
    logfile_max_size: '',
    console_log_pattern: '',
    logfile_log_pattern: '',
    show_progress: '',
    show_drive_stats: '',
    benchmark_only: '',
  };

  formWarning = {
    display: '',
    url: '',
    account_id: '',
    passphrase: '',
    plot_dirs: '',
    hdd_reader_thread_count: '',
    hdd_use_direct_io: '',
    hdd_wake_up_after: '',
    miners_off: '',
    cpu_threads: '',
    cpu_worker_task_count: '',
    cpu_nonces_per_cache: '',
    cpu_thread_pinning: '',
    gpu_threads: '',
    gpu_worker_task_count: '',
    gpu_platform: '',
    gpu_device: '',
    gpu_nonces_per_cache: '',
    gpu_mem_mapping: '',
    gpu_async: '',
    target_deadline: '',
    account_id_dl: '',
    target_deadline_dl: '',
    get_mining_info_interval: '',
    timeout: '',
    send_proxy_details: '',
    console_log_level: '',
    logfile_log_level: '',
    logfile_max_count: '',
    logfile_max_size: '',
    console_log_pattern: '',
    logfile_log_pattern: '',
    show_progress: '',
    show_drive_stats: '',
    benchmark_only: '',
  };

  configYaml = {
    a_url: '',
    c_account_id_to_secret_phrase: '',
    b_plot_dirs: '',
    i_hdd_reader_thread_count: '',
    j_hdd_use_direct_io: '',
    k_hdd_wake_up_after: '',
    miners_off: '',
    l_cpu_threads: '',
    m_cpu_worker_task_count: '',
    n_cpu_nonces_per_cache: '',
    o_cpu_thread_pinning: '',
    p_gpu_threads: '',
    r_gpu_worker_task_count: '',
    q_gpu_platform: '',
    s_gpu_device: '',
    t_gpu_nonces_per_cache: '',
    u_gpu_mem_mapping: '',
    v_gpu_async: '',
    d_target_deadline: '',
    e_account_id_to_target_deadline: '',
    f_get_mining_info_interval: '',
    g_timeout: '',
    h_send_proxy_details: '',
    w_console_log_level: '',
    x_logfile_log_level: '',
    y_logfile_max_count: '',
    z_logfile_max_size: '',
    zaconsole_log_pattern: '',
    zblogfile_log_pattern: '',
    zcshow_progress: '',
    zdshow_drive_stats: '',
    zebenchmark_only: '',
    zfadditional_headers: '',
  };


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Custom validators
    const regnumber = '[0-9]*$';
    // tslint:disable-next-line:max-line-length
    const regurl = '(?:(?:https?):\/\/|www\.|)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-a-z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]):([0-9]{4})(\/?)';

    // Configuration form
    this.configForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(regurl)]],
      account_id_to_secret_phrase: this.fb.array([]),
      plot_dirs: this.fb.array([]),
      miner_settings: this.fb.group({
        hdd_reader_thread_count: ['0', [Validators.required, Validators.pattern(regnumber)]],
        hdd_use_direct_io: ['true', [Validators.required]],
        hdd_wake_up_after: ['240', [Validators.required, Validators.pattern(regnumber)]]
      }),
      cpu_settings: this.fb.group({
        cpu_threads: ['0', [Validators.required, Validators.pattern(regnumber)]],
        cpu_worker_task_count: ['4', [Validators.required, Validators.pattern(regnumber)]], // 0=GPU only
        cpu_nonces_per_cache: ['65536', [Validators.required, Validators.pattern(regnumber)]],
        cpu_thread_pinning: ['false', [Validators.required]],
        memory_usage: [''],
      }),
      gpu_settings: this.fb.group({
        gpu_threads: ['0', [Validators.required, Validators.pattern(regnumber)]], // 0=GPU off
        gpu_worker_task_count: ['0', [Validators.required, Validators.pattern(regnumber)]], // 0= CPU only
        gpu_platform: ['0', [Validators.required, Validators.pattern(regnumber)]],
        gpu_device: ['0', [Validators.required, Validators.pattern(regnumber)]],
        gpu_nonces_per_cache: ['262144', [Validators.pattern(regnumber)]],
        gpu_mem_mapping: ['false'],
        gpu_async: ['false'],
        memory_usage: [''],
      }),
        target_deadline: ['31536000', [Validators.pattern(regnumber)]],
        account_id_to_target_deadline: this.fb.array([]),
        get_mining_info_interval: ['3000', [Validators.required, Validators.pattern(regnumber)]],
        timeout: ['5000', [Validators.required, Validators.pattern(regnumber)]],
        send_proxy_details: ['false', [Validators.required]],
      logging_settings: this.fb.group({
        console_log_level: ['info', [Validators.required]], // off, error, warn, info, debug, trace
        logfile_log_level: ['warn', [Validators.required]], // off, error, warn, info, debug, trace
        logfile_max_count: ['10', [Validators.required, Validators.pattern(regnumber)]],
        logfile_max_size: ['20', [Validators.required, Validators.pattern(regnumber)]],
        console_log_pattern: ['low_noise', [Validators.required]], // low noise, detailed
        logfile_log_pattern: ['low_noise', [Validators.required]] // low noise, detailed
      }),
      display_settings: this.fb.group({
        show_progress: ['true', [Validators.required]],
        show_drive_stats: ['false', [Validators.required]],
        benchmark_only: ['disabled', [Validators.required]] // disabled, I/O, XPU
      }),
      additional_headers: this.fb.array([]),
      gui_settings: this.fb.group({
        validator_messages: [true, [Validators.required]],
        info_messages: [true, [Validators.required]],
        warning_messages: [true, [Validators.required]]
      })
    });

    this.configForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.configForm);
      this.findDuplicateAccount(this.accountForms);
      this.findDuplicatePassphrase(this.accountForms);
      this.findDuplicatePlot(this.plotDirs);
      this.findDuplicateAccountDl(this.deadlineForms);
      this.cpuThreadInfo();
      this.cpuWorkerInfo();
      this.urlInfo();
      this.plotNumberInfo();
      this.hddNumberInfo();
      this.gpuWorkerInfo();
      this.minersOff();
      this.logfileSize();
      this.getGuiSettings();
      console.log(data);
    });
  }
  // Configuration form end

  // Getters
  get url() {
    return this.configForm.get('url');
  }

  get accountForms() {
    return this.configForm.get('account_id_to_secret_phrase') as FormArray;

  }

  get additionalHeaderForms() {
    return this.configForm.get('additional_headers') as FormArray;

  }

  get plotDirs() {
    return this.configForm.get('plot_dirs') as FormArray;
  }

  get miner_settings() {
    return this.configForm.get('miner_settings');
  }

  get cpu_settings() {
    return this.configForm.get('cpu_settings');
  }

  get gpu_settings() {
    return this.configForm.get('gpu_settings');
  }

  get target_deadline() {
    return this.configForm.get('target_deadline');
  }

  get deadlineForms() {
    return this.configForm.get('account_id_to_target_deadline') as FormArray;
  }

  get get_mining_info_interval() {
    return this.configForm.get('get_mining_info_interval');
  }

  get timeout() {
    return this.configForm.get('timeout');
  }

  get send_proxy_details() {
    return this.configForm.get('send_proxy_details');
  }

  get logging_settings() {
    return this.configForm.get('logging_settings');
  }

  get display_settings() {
    return this.configForm.get('display_settings');
  }
  get console_log_level() {
    return this.configForm.get('console_log_level');
  }

  get gui_settings() {
    return this.configForm.get('gui_settings');
  }
  get validator_messages() {
    return this.configForm.get('validator_messages');
  }

  // Getters end

  // get gui settings on value change

  getGuiSettings() {
    const guiValidator = this.gui_settings.get('validator_messages').value;
    const guiInformation = this.gui_settings.get('info_messages').value;
    const guiWarning = this.gui_settings.get('warning_messages').value;
// tslint:disable-next-line: triple-equals
    if (guiValidator === true) {
      this.formErrors.display = 'true';
    } else {
      this.formErrors.display = 'false';
    }
    if (guiInformation === true) {
      this.formInfo.display = 'true';
    } else {
      this.formInfo.display = 'false';
    }
    if (guiWarning === true) {
      this.formWarning.display = 'true';
    } else {
      this.formWarning.display = 'false';
    }
  }

  // URL settings info messages

  urlInfo() {
    const urlInfo = this.configForm.get('url').value as string;
    if (urlInfo == '') {
      this.formWarning.url = 'Providing the URL is mandatory for benchmark and mining configuration.';
    } else {
      this.formWarning.url = '';
    }
  }

  // Plot settings info messages
  plotNumberInfo() {
  const plotNoArr = this.configForm.get('plot_dirs') as FormArray;
  const plotNo = plotNoArr.length;
  if (plotNo == 0) {
      this.formWarning.plot_dirs = 'Plot directory settings have to be provided for benchmark and mining.';
  } else {
    this.formWarning.plot_dirs = '';
  }
}
 // HDD settings info messages
 hddNumberInfo() {
   const hddNo = this.miner_settings.get('hdd_reader_thread_count').value as number;
   if (hddNo == 0) {
     this.formInfo.hdd_reader_thread_count = 'Set to the number of disks.';
   } else {
    this.formInfo.hdd_reader_thread_count = '';
   }
 }
   // CPU settings info messages
   cpuThreadInfo() {
    const cpuThreadsInfo = this.cpu_settings.get('cpu_threads').value as number;
// tslint:disable-next-line: triple-equals
    if (cpuThreadsInfo == 0) {
      this.formInfo.cpu_threads = 'Set to the number of logical CPU cores.';
    } else {
      this.formInfo.cpu_threads = '';
    }
  }

  cpuWorkerInfo() {
    const cpuWorkerInfo = this.cpu_settings.get('cpu_worker_task_count').value as number;
// tslint:disable-next-line: triple-equals
    if (cpuWorkerInfo == 0) {
      this.formInfo.cpu_worker_task_count = 'CPU mining is off.';
    } else {
      this.formInfo.cpu_worker_task_count = 'CPU mining is on.';
    }
  }

  // CPU nonces per cache (on blur)
  cpuNonces() {
    this.formInfo.cpu_nonces_per_cache = '';
    const cpuNonces = this.cpu_settings.get('cpu_nonces_per_cache').value as number;
    if ( cpuNonces > 0) {
    const cpuRemainder = cpuNonces % 64;
    if (cpuRemainder !== 0) {
      this.cpu_settings.patchValue({
        cpu_nonces_per_cache: (cpuNonces - cpuRemainder),
      });
    }
    const cpuNoncesNew = this.cpu_settings.get('cpu_nonces_per_cache').value as number;
    const cpuWorkerInfo = this.cpu_settings.get('cpu_worker_task_count').value as number;
    const cpuThreadsInfo = this.cpu_settings.get('cpu_threads').value as number;
    const memoryUsage = (((cpuNoncesNew * 64) * (cpuThreadsInfo + cpuWorkerInfo)) / 1000000).toFixed(2); // check
    this.cpu_settings.patchValue({
      memory_usage: memoryUsage,
    });
    if (cpuWorkerInfo === 0) {
      this.formInfo.cpu_nonces_per_cache = 'CPU RAM usage: 0 MiB.';
    } else {
// tslint:disable-next-line: max-line-length
    this.formInfo.cpu_nonces_per_cache = 'CPU RAM usage: ' + this.cpu_settings.get('memory_usage').value + ' MiB. (The estimate is more accurate if the number of CPU threads is provided).';
  }
  }
  }

  // GPU info messages


  gpuWorkerInfo() {
    const gpuWorkersInfo = this.gpu_settings.get('gpu_worker_task_count').value as number;
    const gpuThreadsInfo = this.gpu_settings.get('gpu_threads').value as number;
    if ((gpuWorkersInfo == 0) || (gpuThreadsInfo == 0)) {
      this.formInfo.gpu_worker_task_count = 'GPU mining is off.';
    } else {
      this.formInfo.gpu_worker_task_count = 'GPU mining is on.';
    }
  }

  // GPU nonces per cache (on blur)

    gpuNonces() {
      this.formInfo.gpu_nonces_per_cache = '';
      const gpuNonces = this.gpu_settings.get('gpu_nonces_per_cache').value as number;
      const gpuWorkersInfo = this.gpu_settings.get('gpu_worker_task_count').value as number;
      const gpuThreadsInfo = this.gpu_settings.get('gpu_threads').value as number;
      const gpuAsync = this.gpu_settings.get('gpu_async').value;
      let gpuAsyncNo = 0;
      if (gpuAsync === 'true') {
          gpuAsyncNo = 2;
      } else {
          gpuAsyncNo = 1;
      }
      if (gpuNonces > 0) {
      const gpuRemainder = gpuNonces % 64;
      if (gpuRemainder !== 0) {
        this.gpu_settings.patchValue({
          gpu_nonces_per_cache: (gpuNonces - gpuRemainder),
        });
      }
      const gpuNoncesNew = this.gpu_settings.get('gpu_nonces_per_cache').value as number;
      const first: number = gpuAsyncNo * gpuThreadsInfo;
      const second: number = +gpuWorkersInfo + +first;
      const memoryUsage = ((gpuNoncesNew * 64 * second) / 1000000).toFixed(2); // check
      this.gpu_settings.patchValue({
        memory_usage: memoryUsage,
      });
      if ((gpuWorkersInfo === 0) || (gpuThreadsInfo === 0)) {
        this.formInfo.gpu_nonces_per_cache = 'GPU RAM usage: 0 MiB.';
      } else {
      this.formInfo.gpu_nonces_per_cache = 'GPU RAM usage: ' + this.gpu_settings.get('memory_usage').value + ' MiB.';
    }
      }
    }

// CPU and GPU off

minersOff() {
  const cpuWorkerInfo = this.cpu_settings.get('cpu_worker_task_count').value as number;
  const gpuWorkersInfo = this.gpu_settings.get('gpu_worker_task_count').value as number;
  const gpuThreadsInfo = this.gpu_settings.get('gpu_threads').value as number;
  if ((cpuWorkerInfo == 0) && ((gpuWorkersInfo == 0) || (gpuThreadsInfo == 0))) {
    this.formWarning.miners_off = 'CPU and GPU are switched off. Configure CPU, GPU or both for mining to create a valid configuration.';
  } else {
    this.formWarning.miners_off = '';
  }
}
// Logfiles size on disk info message
logfileSize() {
  const logFileNumber = this.logging_settings.get('logfile_max_count').value as number;
  const logFileSizeConst = this.logging_settings.get('logfile_max_size').value as number;
  if (this.logging_settings.get('logfile_log_level').value !== 'off') {
  const fileSizeOnDisk = logFileNumber * logFileSizeConst;
  this.formInfo.logging_settings = 'Logfiles size on disk estimate: ' + fileSizeOnDisk + ' MiB.';
 } else {
  this.formInfo.logging_settings = 'Logfiles size on disk estimate: 0 MiB.';
 }
   }

   // Validation messages + Errors
  logValidationErrors(group: FormGroup = this.configForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
          }
        }
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          const messages = this.validationMessages[key];
          // console.log(messages);
          // console.log(key);
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
       // console.log('Key = ' + key + ' Value = ' + abstractControl.value);
      }
    });
   }

  // Key + Value pairs

  logKeyValuePairs(group: FormGroup): void {
   Object.keys(group.controls).forEach((key: string) => {
     const abstractControl = group.get(key);
     if (abstractControl instanceof FormGroup) {
       this.logKeyValuePairs(abstractControl);
     }
     if (abstractControl instanceof FormArray) {
       for (const control of abstractControl.controls) {
         if (control instanceof FormGroup) {
           this.logKeyValuePairs(control);
         }
       }
     } else {
       console.log('Key = ' + key + ' Value = ' + abstractControl.value);
     }
   });
  }

  // Find duplicate account ID in Account settings
  findDuplicateAccount(array: FormArray) {
    const accArray = this.configForm.get('account_id_to_secret_phrase') as FormArray;
    for (let i = 0; i < (accArray.length - 1); i++) {
      for (let j = i + 1; j < accArray.length; j++) {
        if (accArray.at(i).get('account_id').value === accArray.at(j).get('account_id').value) {
          accArray.at(j).get('account_id').setErrors({ duplicates: true});
        }
      }
    }
  }
// Find duplicate passohrase in Account settings
  findDuplicatePassphrase(array: FormArray) {
    const passArray = this.configForm.get('account_id_to_secret_phrase') as FormArray;
    for (let i = 0; i < (passArray.length - 1); i++) {
      for (let j = i + 1; j < passArray.length; j++) {
        if (passArray.at(i).get('passphrase').value === passArray.at(j).get('passphrase').value) {
          passArray.at(j).get('passphrase').setErrors({ duplicates: true});
        }
      }
    }
  }
// Find duplicate and invalid plots and trim leading and trailing spaces before comparing for duplicates
  findDuplicatePlot(array: FormArray) {
    const plotArray = this.configForm.get('plot_dirs') as FormArray;
    for (let i = 0; i < (plotArray.length); i++) {
      const plotAsStringI = plotArray.at(i).get('plot_dirs').value as string;
      const plotAsStringICasted = plotAsStringI.toString();
      const plotAsStringITrimmed = plotAsStringICasted.trim();
      if (plotAsStringITrimmed === '') {
        plotArray.at(i).get('plot_dirs').setErrors({ allspace: true});
      }
      for (let j = i + 1; j < plotArray.length; j++) {
        const plotAsStringJ = plotArray.at(j).get('plot_dirs').value as string;
        const plotAsStringJCasted = plotAsStringJ.toString();
        const plotAsStringJTrimmed = plotAsStringJCasted.trim();
        if (plotAsStringITrimmed === plotAsStringJTrimmed) {
          plotArray.at(j).get('plot_dirs').setErrors({ duplicates: true});
        }
      }
    }
    const plotArrayInv = this.configForm.get('plot_dirs') as FormArray;
    for (let i = 0; i < (plotArray.length); i++) {
      const plotString = plotArrayInv.at(i).get('plot_dirs').value as string;
      const plotStringCasted = plotString.toString();
      const trimmedPlot = plotStringCasted.trim();
      const regexWin = RegExp('^([A-Z]:[^\<\>\:\"\|\?\*]+)'); // check for better
      const regexNix = RegExp('^\/$|(^(?=\/)|^\.|^\.\.|^\~|^\~(?=\/))(\/(?=[^/\0])[^/\0]+)*\/?$');
      const pathValidWin = regexWin.test(trimmedPlot);
      const pathValidNix = regexNix.test(trimmedPlot);
      if (pathValidWin === false && pathValidNix === false) {
        plotArrayInv.at(i).get('plot_dirs').setErrors({ invalidpath: true });
      }
    }
  }
// Find duplicate account ID in Deathline settings
  findDuplicateAccountDl(array: FormArray) {
    const accDlArray = this.configForm.get('account_id_to_target_deadline') as FormArray;
    for (let i = 0; i < (accDlArray.length - 1); i++) {
      for (let j = i + 1; j < accDlArray.length; j++) {
        if (accDlArray.at(i).get('account_id_dl').value === accDlArray.at(j).get('account_id_dl').value) {
          accDlArray.at(j).get('account_id_dl').setErrors({ duplicates: true});
        }
      }
    }
  }


// Reset configuration to default values without triggering validators
  resetConfig() {
    this.configForm.patchValue({
      url: '',
      miner_settings: {
        hdd_reader_thread_count: '0',
        hdd_use_direct_io: 'true',
        hdd_wake_up_after: '240',
      },
      cpu_settings: {
        cpu_threads: '0',
        cpu_worker_task_count: '4',
        cpu_nonces_per_cache: '65536',
        cpu_thread_pinning: 'false',
        memory_usage: '',
      },
      gpu_settings: {
        gpu_threads: '0',
        gpu_worker_task_count: '0',
        gpu_platform: '0',
        gpu_device: '0',
        gpu_nonces_per_cache: '262144',
        gpu_mem_mapping: 'false',
        gpu_async: 'false',
        memory_usage: '',
      },
      target_deadline: '31536000',
      get_mining_info_interval: '3000',
      timeout: '5000',
      send_proxy_details: 'false',
      logging_settings: {
        console_log_level: 'info',
        logfile_log_level: 'warn',
        logfile_max_count: '10',
        logfile_max_size: '20',
        console_log_pattern: 'low_noise',
        logfile_log_pattern: 'low_noise',
      },
      display_settings: {
        show_progress: 'true',
        show_drive_stats: 'false',
        benchmark_only: 'disabled',
      },
    });
    let acc = this.accountForms.length;
    for ((acc = this.accountForms.length); acc >= 0  ; acc--) {
      this.accountForms.removeAt(acc);
    }
    let pl = this.plotDirs.length;
    for ((pl = this.plotDirs.length); pl >= 0  ; pl--) {
      this.plotDirs.removeAt(pl);
    }
    let dl = this.deadlineForms.length;
    for ((dl = this.deadlineForms.length); dl >= 0  ; dl--) {
      this.deadlineForms.removeAt(dl);
    }
    let ah = this.additionalHeaderForms.length;
    for ((ah = this.additionalHeaderForms.length); ah >= 0  ; ah--) {
      this.additionalHeaderForms.removeAt(ah);
    }
    this.configForm.markAsUntouched();
  }

  // Export Config
 //  exportConfig(): void {
  //  this.logKeyValuePairs(this.configForm);
  // }

  // Preview config
  previewConfig(): void {
    // reset text and object config
    let configYaml = '';
    this.configYaml.a_url = '';
    this.configYaml.c_account_id_to_secret_phrase = '';
    this.configYaml.e_account_id_to_target_deadline = '';
    this.configYaml.zfadditional_headers = '';
    this.configYaml.zebenchmark_only = '';
    this.configYaml.w_console_log_level = '';
    this.configYaml.zaconsole_log_pattern = '';
    this.configYaml.n_cpu_nonces_per_cache = '';
    this.configYaml.o_cpu_thread_pinning = '';
    this.configYaml.l_cpu_threads = '';
    this.configYaml.m_cpu_worker_task_count = '';
    this.configYaml.f_get_mining_info_interval = '';
    this.configYaml.v_gpu_async = '';
    this.configYaml.s_gpu_device = '';
    this.configYaml.u_gpu_mem_mapping = '';
    this.configYaml.q_gpu_platform = '';
    this.configYaml.t_gpu_nonces_per_cache = '';
    this.configYaml.p_gpu_threads = '';
    this.configYaml.r_gpu_worker_task_count = '';
    this.configYaml.i_hdd_reader_thread_count = '';
    this.configYaml.j_hdd_use_direct_io = '';
    this.configYaml.k_hdd_wake_up_after = '';
    this.configYaml.x_logfile_log_level = '';
    this.configYaml.zblogfile_log_pattern = '';
    this.configYaml.y_logfile_max_count = '';
    this.configYaml.z_logfile_max_size = '';
    this.configYaml.b_plot_dirs = '';
    this.configYaml.h_send_proxy_details = '';
    this.configYaml.zdshow_drive_stats = '';
    this.configYaml.zcshow_progress = '';
    this.configYaml.d_target_deadline = '';
    this.configYaml.g_timeout = '';
    // URL
    let hiddenElement = document.createElement('a');
    const urlYaml = this.configForm.get('url').value as string;
    this.configYaml.a_url = '\'' + urlYaml + '\'';
    configYaml = 'url: ' + '\'' + urlYaml + '\'' + '\r\n';
   // hiddenElement.href = 'data:application/yaml,' + encodeURI(configYaml) + '\n';
    // account id + passphrase
    const accountPassphrase = this.configForm.get('account_id_to_secret_phrase') as FormArray;
    let accountPassphraseYaml = '';
    let accountPassphraseYamlHtml = '';
    if (accountPassphrase.length === 0) {
      let accountPassphraseYaml = '';
    } else {
    let accountPassphraseYaml = '\naccount_id_to_secret_phrase:\n';
    for (let i = 0; i < (accountPassphrase.length); i++) {
       const accountIDYaml = accountPassphrase.at(i).get('account_id').value as string;
       const passphraseYaml = accountPassphrase.at(i).get('passphrase').value as string;
       accountPassphraseYaml += accountIDYaml + ':' + '\'' + passphraseYaml + '\'\n';
       accountPassphraseYamlHtml += `${accountIDYaml}:'${passphraseYaml}'`; // works, try to add a \n
      }
    configYaml += accountPassphraseYaml;
    this.configYaml.c_account_id_to_secret_phrase = accountPassphraseYamlHtml;
    // hiddenElement.href += 'data:application/yaml,' + encodeURI(configYaml);
    }
    // plot dirs
    const plotDirs = this.configForm.get('plot_dirs') as FormArray;
    let plotDirsYaml = '';
    // let plotDirsYaml = 'plot_dirs: \n';
    for (let i = 0; i < (plotDirs.length); i++) {
      const plotDirYaml = plotDirs.at(i).get('plot_dirs').value as string;
      const plotDirYamlString = plotDirYaml.toString();
      const plotDirYamlTrimmed = plotDirYamlString.trim();
      plotDirsYaml += '-\'' + plotDirYamlTrimmed + '\'\r\n';
    }
    configYaml += 'plot_dirs: \r\n' + plotDirsYaml + '\r\n';
    this.configYaml.b_plot_dirs = plotDirsYaml; // needs to be fixed
    hiddenElement.href += 'data:application/yaml,' + String(configYaml);
    // miner settings
    const hddReaderThreadCount = this.miner_settings.get('hdd_reader_thread_count').value;
    this.configYaml.i_hdd_reader_thread_count = hddReaderThreadCount;
    configYaml += '\n#Miner settings \nhdd_reader_thread_count: ' + hddReaderThreadCount;
    const hddUseDirectIO = this.miner_settings.get('hdd_use_direct_io').value;
    this.configYaml.j_hdd_use_direct_io = hddUseDirectIO;
    configYaml += '\nhdd_use_direct_io: ' + hddUseDirectIO;
    const hddWakeUpAfter = this.miner_settings.get('hdd_wake_up_after').value;
    this.configYaml.k_hdd_wake_up_after = hddWakeUpAfter;
    configYaml += '\nhdd_wakeup_after: ' + hddWakeUpAfter;
    // mining settings
    const targetDeadline = this.configForm.get('target_deadline').value;
    this.configYaml.d_target_deadline = targetDeadline;
    configYaml += '\n\n#Mining settings \ntarget_deadline: ' + targetDeadline;
    // account ID + target deathline
    const accountDeadline = this.configForm.get('account_id_to_target_deadline') as FormArray;
    let accountDeadlineYaml = '';
    let accountDeadlineYamlHtml = '';
    if (accountDeadline.length === 0) {
      let accountDeadlineYaml = '';
    } else {
    let accountDeadlineYaml = '';
    for (let i = 0; i < (accountDeadline.length); i++) {
       const accountIDDLYaml = accountDeadline.at(i).get('account_id_dl').value as string;
       const deadlineYaml = accountDeadline.at(i).get('target_deadline_dl').value as string;
       accountDeadlineYaml += accountIDDLYaml + ': ' + '' + deadlineYaml + '\n';
       accountDeadlineYamlHtml += `
       ${accountIDDLYaml}: '${deadlineYaml}'
       `;
       // needs to be fixed
      }
    configYaml += '\naccount_id_to_target_deadline:\n' + accountDeadlineYaml;
    this.configYaml.e_account_id_to_target_deadline = accountDeadlineYamlHtml;
    }
    const getMinigInfoInterval = this.configForm.get('get_mining_info_interval').value;
    this.configYaml.f_get_mining_info_interval = getMinigInfoInterval;
    configYaml += '\nget_mining_info_interval: ' + getMinigInfoInterval;
    const timeout = this.configForm.get('timeout').value;
    this.configYaml.g_timeout = timeout;
    configYaml += '\ntimeout: ' + timeout;
    const sendProxyDetails = this.configForm.get('send_proxy_details').value;
    this.configYaml.h_send_proxy_details = sendProxyDetails;
    configYaml += '\nsend_proxy_details: ' + sendProxyDetails;
    // Additional headers
    const additionalHeader = this.configForm.get('additional_headers') as FormArray;
    let additionalHeaderYaml = '';
    let additionalHeaderYamlHtml = '';
    if (additionalHeader.length === 0) {
      let additionalHeaderYaml = '';
    } else {
    let additionalHeaderYaml = '\nadditional_headers:\n';
    for (let i = 0; i < (additionalHeader.length); i++) {
       const headerKeyYaml = additionalHeader.at(i).get('header_key').value as string;
       const headerValueYaml = additionalHeader.at(i).get('header_value').value as string;
       additionalHeaderYaml += '\"' + headerKeyYaml + '\"' + ': ' + '\"' + headerValueYaml + '\"' + '\n';
       additionalHeaderYamlHtml += `
       "${headerKeyYaml}":"${headerValueYaml}"\
       `;
       // needs to be fixed
      }
    configYaml += additionalHeaderYaml;
    this.configYaml.zfadditional_headers = additionalHeaderYamlHtml;
    }
    // CPU settings
    const cpuThreads = this.cpu_settings.get('cpu_threads').value;
    this.configYaml.l_cpu_threads = cpuThreads;
    configYaml += '\n\n#CPU settings\ncpu_threads: ' + cpuThreads;
    const cpuWorkerTaskCount = this.cpu_settings.get('cpu_worker_task_count').value;
    this.configYaml.m_cpu_worker_task_count = cpuWorkerTaskCount;
    configYaml += '\ncpu_worker_task_count: ' + cpuWorkerTaskCount;
    const cpuNoncesPerCache = this.cpu_settings.get('cpu_nonces_per_cache').value;
    this.configYaml.n_cpu_nonces_per_cache = cpuNoncesPerCache;
    configYaml += '\ncpu_nonces_per_cache: ' + cpuNoncesPerCache;
    const cpuThreadPinning = this.cpu_settings.get('cpu_thread_pinning').value;
    this.configYaml.o_cpu_thread_pinning = cpuThreadPinning;
    configYaml += '\ncpu_thread_pinning: ' + cpuThreadPinning;
    // GPU settings
    const gpuThreads = this.gpu_settings.get('gpu_threads').value;
    this.configYaml.p_gpu_threads = gpuThreads;
    configYaml += '\n\n#GPU settings\ngpu_threads: ' + gpuThreads;
    const gpuWorkerTaskCount = this.gpu_settings.get('gpu_worker_task_count').value;
    this.configYaml.r_gpu_worker_task_count = gpuWorkerTaskCount;
    configYaml += '\ngpu_worker_task_count: ' + gpuWorkerTaskCount;
    const gpuPlatform = this.gpu_settings.get('gpu_platform').value;
    this.configYaml.q_gpu_platform = gpuPlatform;
    configYaml += '\ngpu_platform: ' + gpuPlatform;
    const gpuDevice = this.gpu_settings.get('gpu_device').value;
    this.configYaml.s_gpu_device = gpuDevice;
    configYaml += '\ngpu_device: ' + gpuDevice;
    const gpuNoncesPercache = this.gpu_settings.get('gpu_nonces_per_cache').value;
    this.configYaml.t_gpu_nonces_per_cache = gpuNoncesPercache;
    configYaml += '\ngpu_nonces_per_cache: ' + gpuNoncesPercache;
    const gpuMemoryMapping = this.gpu_settings.get('gpu_mem_mapping').value;
    this.configYaml.u_gpu_mem_mapping = gpuMemoryMapping;
    configYaml += '\ngpu_mem_mapping: ' + gpuMemoryMapping;
    const gpuAsync = this.gpu_settings.get('gpu_async').value;
    this.configYaml.v_gpu_async = gpuAsync;
    configYaml += '\ngpu_async: ' + gpuAsync;
    // Logging settings
    const consoleLogLevel = this.logging_settings.get('console_log_level').value;
    this.configYaml.w_console_log_level = '\'' + consoleLogLevel + '\'';
    configYaml += '\n\n#Logging settings\nconsole_log_level: ' + '\'' + consoleLogLevel + '\'';
    const logfileLogLevel = this.logging_settings.get('logfile_log_level').value;
    this.configYaml.x_logfile_log_level = '\'' + logfileLogLevel + '\'';
    configYaml += '\nlogfile_log_level: ' + '\'' + logfileLogLevel + '\'';
    const logfileMaxCount = this.logging_settings.get('logfile_max_count').value;
    this.configYaml.y_logfile_max_count = logfileMaxCount;
    configYaml += '\nlogfile_max_count: ' + logfileMaxCount;
    const logfileMaxSize = this.logging_settings.get('logfile_max_size').value;
    this.configYaml.z_logfile_max_size = logfileMaxSize;
    configYaml += '\nlogfile_max_size: ' + logfileMaxSize;
    const lowNoiseConsole = '\"{({d(%H:%M:%S)} [{l}]):16.16} {m}{n}\"';
    const lowNoiseLogfile = '\"{({d(%Y-%m-%d %H:%M:%S)} [{l}]):26.26} {m}{n}\"';
    const detailedConsole = '\"{d(%H:%M:%S.%3f%z)} [{h({l}):<5}] [{T}] [{t}] - {M}:{m}{n}\"';
    const detailedLogfile = '\"{d(%Y-%m-%dT%H:%M:%S.%3f%z)} [{h({l}):<5}] [{T}]-[{t}] [{f}:{L}] - {M}:{m}{n}\"';
    const consoleLogPattern = this.logging_settings.get('console_log_pattern').value;
    if (consoleLogPattern === 'low_noise') {
      this.configYaml.zaconsole_log_pattern = lowNoiseConsole;
      configYaml += '\nconsole_log_pattern: ' + lowNoiseConsole;
    } else {
      this.configYaml.zaconsole_log_pattern = detailedConsole;
      configYaml += '\nconsole_log_pattern: ' + detailedConsole;
    }
    const logfileLogPattern = this.logging_settings.get('logfile_log_pattern').value;
    if (logfileLogPattern === 'low_noise') {
      this.configYaml.zblogfile_log_pattern = lowNoiseLogfile;
      configYaml += '\nlogfile_log_pattern: ' + lowNoiseLogfile;
    } else {
      this.configYaml.zblogfile_log_pattern = detailedLogfile;
      configYaml += '\nlogfile_log_pattern: ' + detailedLogfile;
    }
    // Display and benchmark settings
    const showProgress = this.display_settings.get('show_progress').value;
    this.configYaml.zcshow_progress = showProgress; // needs to be fixed
    configYaml += '\n\n#Display and benchmark settings\nshow_progress: ' + showProgress;
    const showDriveStats = this.display_settings.get('show_drive_stats').value;
    this.configYaml.zdshow_drive_stats = showDriveStats; // needs to be fixed
    configYaml += '\nshow_drive_stats: ' + showDriveStats;
    const benchmarkOnly = this.display_settings.get('benchmark_only').value;
    this.configYaml.zebenchmark_only = '\'' + benchmarkOnly + '\''; // needs to be fixed
    configYaml += '\nbenchmark_only: ' + '\'' + benchmarkOnly + '\'' + '\n\n#Config created with Gyra.';
    console.log('configYaml: ' + configYaml);



    console.log('coMfig' + configYaml);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'config.yaml';
    hiddenElement.click();
    }

    // Add account ID and passphrase
  addAccount(i: number) {
    const regnumber = '[0-9]*$';
    const account = this.fb.group({
      account_id: [[], [Validators.required, Validators.min(0),
        Validators.max(18446744073709551616), Validators.pattern(regnumber)]],
      passphrase: [[], [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    });
    this.accountForms.push(account);
    this.accountForms.markAsUntouched();

  }
  deleteAccount(i: number) {
    this.accountForms.removeAt(i);
  }

  // Add additional information key:value pairs
  addAdditionalHeader(i: number) {
    const additionaHeader = this.fb.group({
      header_key: [[], [Validators.required]],
      header_value: [[], [Validators.required]],
    });
    this.additionalHeaderForms.push(additionaHeader);
    this.additionalHeaderForms.markAsUntouched();

  }
  deleteAdditionalHeader(i: number) {
    this.additionalHeaderForms.removeAt(i);
  }

// Add plot
  addPlots() {
    const plotdirs = this.fb.group({
    plot_dirs: [[], [
    Validators.required, // add validator to detect invalid characters in paths
    ]]
   });
    this.plotDirs.push(plotdirs);
    this.plotDirs.markAsUntouched();
  }
  deletePlots(i: number) {
    this.plotDirs.removeAt(i);
  }

// Add account ID and deathlines
addDeadline() {
  const regnumber = '[0-9]*$';
  const deadlines = this.fb.group({
    account_id_dl: [[], [Validators.required, Validators.min(0),
      Validators.max(18446744073709551616), Validators.pattern(regnumber)]],
      target_deadline_dl: [[], [Validators.required, Validators.minLength(0), Validators.maxLength(20),
      Validators.pattern(regnumber)]],
  });

  this.deadlineForms.push(deadlines);
  this.deadlineForms.markAsUntouched();
}
deleteDeadline(i: number) {
  this.deadlineForms.removeAt(i);
}
// End form controls
  onSubmit(): void {
    console.log(JSON.stringify(this.configForm.value));
    console.log(this.configForm);
  }

}







