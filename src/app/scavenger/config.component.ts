import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Key } from 'protractor';
import { __values } from 'tslib';
import { forEach } from '@angular/router/src/utils/collection';
import { concat } from 'rxjs';
import { url } from 'inspector';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configForm: FormGroup;
  savedConfigForm: FormGroup;

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
    url: '',
    account_id_to_secret_phrase: '',
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
        target_deadline: ['', [Validators.pattern(regnumber)]],
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
     // console.log('counter i:' + i + ' ' + accArray.at(i).get('account_id').value);
      for (let j = i + 1; j < accArray.length; j++) {
       // console.log('counter j:' + j + ' ' + accArray.at(j).get('account_id').value);
        if (accArray.at(i).get('account_id').value === accArray.at(j).get('account_id').value) {
         // console.log(accArray.at(i).get('account_id').value + 'duplicates are not allowed' + 'i: ' + i + ', j: ' + j);
          accArray.at(j).get('account_id').setErrors({ duplicates: true});
        }
      }
    }
  }
// Find duplicate passohrase in Account settings
  findDuplicatePassphrase(array: FormArray) {
    const passArray = this.configForm.get('account_id_to_secret_phrase') as FormArray;
    for (let i = 0; i < (passArray.length - 1); i++) {
   //   console.log('counter i:' + i + ' ' + passArray.at(i).get('passphrase').value);
      for (let j = i + 1; j < passArray.length; j++) {
     //   console.log('counter j:' + j + ' ' + passArray.at(j).get('passphrase').value);
        if (passArray.at(i).get('passphrase').value === passArray.at(j).get('passphrase').value) {
       //   console.log(passArray.at(i).get('passphrase').value + 'duplicates are not allowed' + 'i: ' + i + ', j: ' + j);
          passArray.at(j).get('passphrase').setErrors({ duplicates: true});
        }
      }
    }
  }
// Find duplicate plots
  findDuplicatePlot(array: FormArray) {
    const plotArray = this.configForm.get('plot_dirs') as FormArray;
    for (let i = 0; i < (plotArray.length); i++) {
    //  console.log('counter i:' + i + ' ' + plotArray.at(i).get('plot_dirs').value);
      for (let j = i + 1; j < plotArray.length; j++) {
     //   console.log('counter j:' + j + ' ' + plotArray.at(j).get('plot_dirs').value);
        if (plotArray.at(i).get('plot_dirs').value === plotArray.at(j).get('plot_dirs').value) {
      //    console.log(plotArray.at(i).get('plot_dirs').value + 'duplicates are not allowed' + 'i: ' + i + ', j: ' + j);
          plotArray.at(j).get('plot_dirs').setErrors({ duplicates: true});
        }
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
      target_deadline: '',
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
    this.configForm.markAsUntouched();
  }

  // Export Config
 //  exportConfig(): void {
  //  this.logKeyValuePairs(this.configForm);
  // }

  // Preview config
  previewConfig(): void {
    // URL
    let configYaml = '';
    const urlYaml = this.configForm.get('url').value as string;
    this.configYaml.url = 'url: ' + '\'' + urlYaml + '\''; // needs to be fixed
    configYaml = 'url: ' + '\'' + urlYaml + '\'' + '\n';
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
       accountPassphraseYamlHtml += `
       ${accountIDYaml}: '${passphraseYaml}'\
       `;
       // needs to be fixed
      }
    configYaml += accountPassphraseYaml;
    this.configYaml.account_id_to_secret_phrase = accountPassphraseYamlHtml;
    }
    // plot dirs
    const plotDirs = this.configForm.get('plot_dirs') as FormArray;
    let plotDirsYaml = 'plot_dirs: \n';
    for (let i = 0; i < (plotDirs.length); i++) {
      const plotDirYaml = plotDirs.at(i).get('plot_dirs').value as string;
      plotDirsYaml += '-\'' + plotDirYaml + '\'\n';
    }
    configYaml += '\n' + plotDirsYaml;
    this.configYaml.plot_dirs = plotDirsYaml; // needs to be fixed
    const hddReaderThreadCount = this.miner_settings.get('hdd_reader_thread_count').value;
    this.configYaml.hdd_reader_thread_count = hddReaderThreadCount; // needs to be fixed
    configYaml += '\n#Miner settings \nhdd_reader_thread_count: ' + hddReaderThreadCount;
    const hddUseDirectIO = this.miner_settings.get('hdd_use_direct_io').value;
    this.configYaml.hdd_use_direct_io = hddUseDirectIO;
    configYaml += '\nhdd_use_direct_io: ' + hddUseDirectIO;
    const hddWakeUpAfter = this.miner_settings.get('hdd_wake_up_after').value;
    this.configYaml.hdd_wake_up_after = hddWakeUpAfter; // needs to be fixed
    configYaml += '\nhdd_wakeup_after: ' + hddWakeUpAfter;
    console.log('configYaml: ' + configYaml);
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

// Add plot
  addPlots() {
    const plotdirs = this.fb.group({
    plot_dirs: [[], [
    Validators.required,
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







