import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Key } from 'protractor';
import { __values } from 'tslib';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configForm: FormGroup;

  validationMessages = {
    'url': {
      'required': 'URL and port number are required.',
      'pattern': 'The provided URL does not comply to the required URL format.',
    },
    'account_id': {
      'required': 'The numeric account ID is required.',
      'min': 'The numeric account ID canot be less than 0.',
      'max': 'The numeric account ID cannot be greater than 18446744073709551616.',
      'pattern': 'The numeric account ID can contain only numbers between 0 and 9.',
    },
    'passphrase': {
      'required': 'The passphrase is required.',
      'minlength': 'The passphrase has to contain at least 1 character.',
      'maxlength': 'The passphrase cannot contain more than 300 characters.',
    },
    'plot_dirs': {
      'required': 'Directories containing plot files have to be provided.',
    },
    'hdd_reader_thread_count': {
      'required': 'The number of HDD reader threads has to be provided.',
      'pattern': 'The number of HDD reader threads has to be a non-negative integer.',
    },
    'hdd_use_direct_io': {
      'required': 'The setting is required.',
    },
    'hdd_wake_up_after': {
      'required': 'The HDD wake-up setting is required.',
      'pattern': 'The setting has to be a non-negative integer.',
    },
    'cpu_threads': {
      'required': 'The CPU threads number setting is required.',
      'pattern': 'The CPU threads number has to be a non-negative integer.',
    },
    'cpu_worker_task_count': {
      'required': 'The number of CPU worker tasks is required.',
      'pattern': 'The number of CPU worker tasks has to be a non-negative integer.',
    },
    'cpu_nonces_per_cache': {
      'required': 'The CPU nonces per cache setting is required.',
      'pattern': 'The CPU nonces per cache has to be a non-negative integer.',
    },
    'cpu_thread_pinning': {
      'required': 'CPU thread pinning is a required setting.',
    },
    'gpu_threads': {
      'required': 'Setting the number of GPU threads is mandatory.',
      'pattern': 'The GPU thread number has to be a non-negative integer.',
    },
    'gpu_worker_task_count': {
      'required': 'The GPU worker task number is a mandatory setting.',
      'pattern': 'The GPU worker task number has to be a non-negative integer.',
    },
    'gpu_platform': {
      'required': 'The GPU platform number is a required setting.',
      'pattern': 'The GPU platform has to be a non-negative integer.',
    },
    'gpu_device': {
      'required': 'The GPU device setting is required.',
      'pattern': 'The GPU device setting has to be a non-negative integer.',
    },
    'gpu_nonces_per_cache': {
      'required': 'The GPU nonces per cache setting is required.',
      'pattern': 'The GPU nonces per cache setting has to be a non-negative integer.',
    },
    'gpu_mem_mapping': {
      'required': 'The GPU memory mapping setting is required.',
    },
    'gpu_async': {
      'required': 'The GPU async setting is required.',
    },
    'target_deadline': {
      'pattern': 'The target deadline has to be a non-negative integer.',
    },
    'account_id_dl': {
      'required': 'The numeric account ID setting is required.',
      'min': 'The numeric account ID canot be less than 0.',
      'max': 'The numeric account ID cannot be greater than 18446744073709551616.',
      'pattern': 'The numeric account ID can contain only numbers between 0 and 9.',
    },
    'target_deadline_dl': {
      'required': 'The target deadline for the provided numeric account ID is required.',
      'minlength': 'The target deadline for the provided numeric account ID is required.',
      'maxlength': 'The target deadline length cannot exceed the length of 20.',
      'pattern': 'The target deadline has to be a non-negative integer.',
    },
    'get_mining_info_interval': {
      'required': 'The setting is required.',
      'pattern': 'The setting has to be a non-negative integer.',
    },
    'timeout': {
      'required': 'The timeout setting is required.',
      'pattern': 'The timeout has to be a non-negative integer.',
    },
    'send_proxy_details': {
      'required': 'The setting is required.',
    },
    'console_log_level': {
      'required': 'The setting is required.',
    },
    'logfile_log_level': {
      'required': 'The setting is required.',
    },
    'logfile_max_count': {
      'required': 'The number of log files to keep setting is required.',
      'pattern': 'The number of log files to keep has to be a non-negative integer.',
    },
    'logfile_max_size': {
      'required': 'The maximum size of a log file setting is required.',
      'pattern': 'The maximum size of a log file has to be a non-negative integer.',
    },
    'show_progress': {
      'required': 'The setting is required.',
    },
    'show_drive_stats': {
      'required': 'The setting is required.',
    },
    'benchmark_only': {
      'required': 'The setting is required.',
    },
  };

  formErrors = {
    'url': '',
    'account_id': '',
    'passphrase': '',
    'plot_dirs': '',
    'hdd_reader_thread_count': '',
    'hdd_use_direct_io': '',
    'hdd_wake_up_after': '',
    'cpu_threads': '',
    'cpu_worker_task_count': '',
    'cpu_nonces_per_cache': '',
    'cpu_thread_pinning': '',
    'gpu_threads': '',
    'gpu_worker_task_count': '',
    'gpu_platform': '',
    'gpu_device': '',
    'gpu_nonces_per_cache': '',
    'gpu_mem_mapping': '',
    'gpu_async': '',
    'target_deadline': '',
    'account_id_dl': '',
    'target_deadline_dl': '',
    'get_mining_info_interval': '',
    'timeout': '',
    'send_proxy_details': '',
    'console_log_level': '',
    'logfile_log_level': '',
    'logfile_max_count': '',
    'logfile_max_size': '',
    'show_progress': '',
    'show_drive_stats': '',
    'benchmark_only': '',
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
      plot_dirs: this.fb.array([

      ]),
      miner_settings: this.fb.group({
        hdd_reader_thread_count: ['0', [Validators.required, Validators.pattern(regnumber)]],
        hdd_use_direct_io: ['true', [Validators.required]],
        hdd_wake_up_after: ['240', [Validators.required, Validators.pattern(regnumber)]]
      }),
      cpu_settings: this.fb.group({
        cpu_threads: ['0', [Validators.required, Validators.pattern(regnumber)]],
        cpu_worker_task_count: ['4', [Validators.required, Validators.pattern(regnumber)]], // 0=GPU only
        cpu_nonces_per_cache: ['65536', [Validators.required, Validators.pattern(regnumber)]],
        cpu_thread_pinning: ['false', [Validators.required]]
      }),
      gpu_settings: this.fb.group({
        gpu_threads: ['0', [Validators.required, Validators.pattern(regnumber)]], // 0=GPU off
        gpu_worker_task_count: ['0', [Validators.required, Validators.pattern(regnumber)]], // 0= CPU only
        gpu_platform: ['0', [Validators.required, Validators.pattern(regnumber)]],
        gpu_device: ['0', [Validators.required, Validators.pattern(regnumber)]],
        gpu_nonces_per_cache: ['262144'],
        gpu_mem_mapping: ['false'],
        gpu_async: ['false']
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
        logfile_max_size: ['20', [Validators.required, Validators.pattern(regnumber)]]
      }),
      display_settings: this.fb.group({
        show_progress: ['true', [Validators.required]],
        show_drive_stats: ['false', [Validators.required]],
        benchmark_only: ['disabled', [Validators.required]] // disabled, I/O, XPU
      })
    });

    this.configForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.configForm);
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

  // Getters end


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
    // {
     //  console.log(Object.values(this.accountForms.value));
   //    console.log('Number of accounts = ' + Object(this.accountForms).length);
     //  console.log(Object.values(this.plotDirs.value));
    //   console.log('Number of plots = ' + Object(this.plotDirs).length);
    //   console.log(Object.values(this.deadlineForms.value));
   //    console.log('Number of deadlines =' + Object(this.deadlineForms).length);
   //  }
   });
  }




  // Export Config
  exportConfig(): void {
    this.logKeyValuePairs(this.configForm);
  }

  // Trigger validation
  loadConfig(): void {
  //
  }
  // Add account ID and passphrase
  addAccount() {
    const regnumber = '[0-9]*$';
    const account = this.fb.group({
      account_id: [[], [Validators.required, Validators.min(0),
        Validators.max(18446744073709551616), Validators.pattern(regnumber)]],
      passphrase: [[], [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    });

    this.accountForms.push(account);
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
  }
  deletePlots(i: number) {
    this.plotDirs.removeAt(i);
  }

// Add account ID and deadlines
addDeadline() {
  const regnumber = '[0-9]*$';
  const deadlines = this.fb.group({
    account_id_dl: [[], [Validators.required, Validators.min(0),
      Validators.max(18446744073709551616), Validators.pattern(regnumber)]],
      target_deadline_dl: [[], [Validators.required, Validators.minLength(0), Validators.maxLength(20),
      Validators.pattern(regnumber)]],
  });

  this.deadlineForms.push(deadlines);
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



