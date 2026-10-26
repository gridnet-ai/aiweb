import { useState, type ReactNode } from 'react';
import { Check, ChevronDown, ClipboardCopy, Printer } from 'lucide-react';

export const GEEKDOM_PRINTER_IP = '10.10.0.50';

const MAC_AI_PROMPT = `Help me connect my MacBook to a Ricoh network printer at IP address ${GEEKDOM_PRINTER_IP}. Guide me step by step through macOS System Settings, printer discovery, manual IP setup, compatible driver selection, and printing a test page. Ask me for the Ricoh model and macOS version if needed. Help troubleshoot any problems until I can print successfully.`;

const IP_SETTINGS: { field: string; value: string }[] = [
  { field: 'Address', value: GEEKDOM_PRINTER_IP },
  { field: 'Protocol', value: 'AirPrint or IPP, if supported' },
  { field: 'Queue', value: 'Leave blank unless instructed otherwise' },
  { field: 'Name', value: 'Ricoh Office Printer' },
  { field: 'Location', value: 'Office (optional)' },
  { field: 'Use', value: 'AirPrint or compatible Ricoh driver' },
];

const MAC_TROUBLESHOOTING: { question: string; answer: ReactNode }[] = [
  {
    question: 'The Ricoh printer doesn’t appear',
    answer: (
      <>
        Check that the printer is powered on and that your Mac is on Geekdom Wi‑Fi (password{' '}
        <code>Geekdom1100</code>), not a guest network. Confirm you can reach IP{' '}
        <code>{GEEKDOM_PRINTER_IP}</code>, then add the printer manually on the IP tab instead of
        waiting for discovery.
      </>
    ),
  },
  {
    question: 'The printer appears but won’t print',
    answer: (
      <>
        Open the print queue and clear stuck jobs. Confirm status isn’t Paused or Offline. Recheck
        the selected driver/protocol (AirPrint or IPP) and whether the printer requires a user code
        or department ID for authentication.
      </>
    ),
  },
  {
    question: 'macOS says no suitable driver is available',
    answer: (
      <>
        Prefer AirPrint if the Ricoh supports it. Otherwise identify the exact model (likely IM
        C4500 at Geekdom) and install the matching macOS driver from official Ricoh support. Do not
        install the Windows <code>RICOH PS UniversalDriver V4.46</code> executable on a Mac.
      </>
    ),
  },
  {
    question: 'The print job disappears but nothing prints',
    answer: (
      <>
        Confirm the destination is <strong>Ricoh Office Printer</strong> at{' '}
        <code>{GEEKDOM_PRINTER_IP}</code>, that the protocol is supported, and that you’re still on
        Geekdom Wi‑Fi. Some Ricohs drop jobs silently when a user code or department authentication
        is required — ask front desk if that’s enabled.
      </>
    ),
  },
];

function Placeholder({ label }: { label: string }) {
  return (
    <div className="gdmac-placeholder" role="img" aria-label={label}>
      <Printer size={28} strokeWidth={1.5} aria-hidden="true" />
      <span>{label}</span>
      <small>Screenshot coming soon</small>
    </div>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function GeekdomMacGuide() {
  const [ipCopied, setIpCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [openTrouble, setOpenTrouble] = useState<number | null>(0);

  const onCopyIp = async () => {
    const ok = await copyText(GEEKDOM_PRINTER_IP);
    if (!ok) return;
    setIpCopied(true);
    window.setTimeout(() => setIpCopied(false), 2000);
  };

  const onCopyPrompt = async () => {
    const ok = await copyText(MAC_AI_PROMPT);
    if (!ok) return;
    setPromptCopied(true);
    window.setTimeout(() => setPromptCopied(false), 2000);
  };

  return (
    <article className="gdmac">
      <header className="gdmac-header">
        <h2 className="gdmac-title">How to Connect a MacBook to the Ricoh Printer</h2>
        <p className="gdmac-intro">
          These instructions are for MacBook Air, MacBook Pro, and other Macs running macOS.
        </p>
      </header>

      <div className="gdmac-ip-card">
        <div className="gdmac-ip-icon" aria-hidden="true">
          <Printer size={28} strokeWidth={1.75} />
        </div>
        <div className="gdmac-ip-body">
          <p className="gdmac-ip-name">Ricoh Network Printer</p>
          <p className="gdmac-ip-label">Printer IP address</p>
          <div className="gdmac-ip-row">
            <p className="gdmac-ip-value">{GEEKDOM_PRINTER_IP}</p>
            <button type="button" className="gdmac-copy-ip" onClick={() => void onCopyIp()}>
              {ipCopied ? <Check size={16} aria-hidden="true" /> : <ClipboardCopy size={16} aria-hidden="true" />}
              {ipCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <ol className="gdmac-steps">
        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 1</span> Connect to the correct Wi‑Fi network
          </h3>
          <p>
            Make sure your MacBook is connected to Geekdom Wi‑Fi (password <code>Geekdom1100</code>
            ), the same office network as the Ricoh printer.
          </p>
          <p className="gdmac-note">
            The printer uses the private IP address <code>{GEEKDOM_PRINTER_IP}</code>. This address
            generally cannot be accessed directly over the public internet.
          </p>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 2</span> Open Printers &amp; Scanners
          </h3>
          <div className="gdmac-split">
            <Placeholder label="macOS System Settings → Printers & Scanners" />
            <ol className="gdmac-list">
              <li>Click the Apple menu in the upper-left corner.</li>
              <li>Select System Settings.</li>
              <li>Scroll down the left sidebar.</li>
              <li>Click Printers &amp; Scanners.</li>
            </ol>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 3</span> Add the printer
          </h3>
          <ol className="gdmac-list">
            <li>Click Add Printer, Scanner, or Fax.</li>
            <li>Wait while macOS searches for available printers.</li>
            <li>Look for a Ricoh printer in the list.</li>
            <li>If the printer appears, select it.</li>
          </ol>
          <p>
            If the printer supports AirPrint, macOS may automatically identify it. Click{' '}
            <strong>Add</strong>, then skip to Step 7.
          </p>
          <p>If it does not appear, continue with manual IP setup.</p>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 4</span> Add the printer manually using its IP address
          </h3>
          <div className="gdmac-split">
            <Placeholder label="macOS Add Printer — IP tab" />
            <ol className="gdmac-list">
              <li>Open the IP tab in the Add Printer window.</li>
              <li>Enter the printer address and connection settings below.</li>
            </ol>
          </div>
          <div className="gdmac-table-wrap">
            <table className="gdmac-table">
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {IP_SETTINGS.map((row) => (
                  <tr key={row.field}>
                    <th scope="row">{row.field}</th>
                    <td>
                      {row.field === 'Address' ? <code>{row.value}</code> : row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="gdmac-note">
            The exact printer model has not been confirmed on every Geekdom floor unit. The selected
            protocol must be supported by the printer. Do not assume that every Ricoh supports
            AirPrint, IPP, or other protocols. At Geekdom the network Ricoh is typically an IM
            C4500.
          </p>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 5</span> Select the printer software
          </h3>
          <ul className="gdmac-bullets">
            <li>If AirPrint is available and supported, select it.</li>
            <li>If macOS identifies the correct Ricoh model and driver, select that driver.</li>
            <li>
              Otherwise, find the exact printer model and download compatible macOS software from{' '}
              <a
                href="https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/imc4500/imc4500.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                official Ricoh support
              </a>
              .
            </li>
            <li>
              Do not install the Windows <code>RICOH PS UniversalDriver V4.46</code> executable on
              macOS.
            </li>
          </ul>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 6</span> Complete installation
          </h3>
          <ol className="gdmac-list">
            <li>Click Add.</li>
            <li>Allow macOS to configure the printer.</li>
            <li>If prompted, configure only the accessories actually installed.</li>
            <li>Return to System Settings → Printers &amp; Scanners.</li>
            <li>Confirm Ricoh Office Printer appears in the list.</li>
          </ol>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 7</span> Print a test page
          </h3>
          <div className="gdmac-split">
            <Placeholder label="macOS print dialog — select Ricoh Office Printer" />
            <ol className="gdmac-list">
              <li>Open TextEdit.</li>
              <li>Create a new document.</li>
              <li>
                Type: <code>Ricoh MacBook Printer Test</code>
              </li>
              <li>Press Command + P.</li>
              <li>Select Ricoh Office Printer.</li>
              <li>Click Print.</li>
            </ol>
          </div>
          <p className="gdmac-success">
            If the test page prints, setup is successful — you’re ready to print from Geekdom on your
            Mac.
          </p>
        </li>
      </ol>

      <section className="gdmac-trouble" aria-labelledby="gdmac-trouble-title">
        <h3 id="gdmac-trouble-title" className="gdmac-section-title">
          Troubleshooting
        </h3>
        <div className="gdmac-accordion">
          {MAC_TROUBLESHOOTING.map((item, index) => {
            const open = openTrouble === index;
            return (
              <div
                key={item.question}
                className={['gdmac-acc-item', open ? 'gdmac-acc-item--open' : ''].join(' ')}
              >
                <h4>
                  <button
                    type="button"
                    className="gdmac-acc-trigger"
                    aria-expanded={open}
                    onClick={() => setOpenTrouble(open ? null : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown className="gdmac-acc-chevron" size={18} aria-hidden="true" />
                  </button>
                </h4>
                {open ? <div className="gdmac-acc-panel">{item.answer}</div> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="gdmac-ai" aria-labelledby="gdmac-ai-title">
        <h3 id="gdmac-ai-title" className="gdmac-section-title">
          Get guided help from an AI assistant
        </h3>
        <p className="gdmac-ai-desc">
          MacBook users can copy this prompt into ChatGPT, Claude, Gemini, or another AI assistant.
        </p>
        <pre className="gdmac-prompt">{MAC_AI_PROMPT}</pre>
        <button type="button" className="gdmac-copy-prompt" onClick={() => void onCopyPrompt()}>
          {promptCopied ? 'Copied' : 'Copy MacBook setup prompt'}
        </button>
      </section>

      <p className="gdmac-ref">
        Official reference:{' '}
        <a
          href="https://support.apple.com/guide/mac-help/add-and-manage-printers-mh14004/mac"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apple — Add and manage printers on Mac
        </a>
      </p>
    </article>
  );
}
