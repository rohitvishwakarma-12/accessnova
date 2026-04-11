import { readFileSync } from 'fs';
import { join } from 'path';

const viewsDir = join(process.cwd(), 'views');

type ContactTemplateOptions = {
  error?: string;
  success?: string;
};

function readView(name: string) {
  return readFileSync(join(viewsDir, `${name}.hbs`), 'utf8');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildSuccessBlock(message: string) {
  return `
        <div class="p-5 mb-8 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-start gap-3">
          <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          <div>
            <p class="font-semibold">Message Sent Successfully!</p>
            <p class="text-sm mt-1">${escapeHtml(message)} A confirmation email has been sent to your inbox.</p>
          </div>
        </div>
  `;
}

function buildErrorBlock(message: string) {
  return `
        <div class="p-5 mb-8 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          <div>
            <p class="font-semibold">Something went wrong</p>
            <p class="text-sm mt-1">${escapeHtml(message)}</p>
          </div>
        </div>
  `;
}

export function loadStaticTemplate(name: string) {
  return readView(name);
}

export function loadContactTemplate(options: ContactTemplateOptions = {}) {
  const template = readView('contact')
    .replace(
      /{{#if success}}[\s\S]*?{{\/if}}/,
      options.success ? buildSuccessBlock(options.success) : '',
    )
    .replace(
      /{{#if error}}[\s\S]*?{{\/if}}/,
      options.error ? buildErrorBlock(options.error) : '',
    )
    .replace('action="/contact"', 'action="/api/contact"');

  return template;
}
