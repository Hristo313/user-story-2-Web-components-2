import { html, css, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { defineComponents, IgcTreeComponent } from 'igniteui-webcomponents';
import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids';
import { ifDefined } from 'lit/directives/if-defined.js';
import baseStyles from '/src/app/base-view-styles.css?inline';
import gridThemeLightMaterial from 'igniteui-webcomponents-grids/grids/themes/light/material.css?inline'
import { BoxOfficeRevenueType } from '../models/Financial/box-office-revenue-type';
import { financialService } from '../services/financial-service';

defineComponents(IgcTreeComponent, IgcGridComponent);

ModuleManager.register(IgcCategoryChartModule);

@customElement('app-tree-example')
export default class TreeExample extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      overflow: auto;
      position: relative;
      padding: 16px;
      width: 346px;
      min-width: 50px;
      min-height: 50px;
      max-width: 346px;
    }
    .group_1 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_2 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      padding: 16px;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .tree {
      height: 100%;
      min-width: max-content;
      min-height: max-content;
      max-height: 100%;
      flex-shrink: 0;
    }
    .grid {
      --ig-size: var(--ig-size-medium);
      min-width: 600px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .text {
      height: max-content;
      min-width: min-content;
    }
    .category-chart {
      min-width: 400px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
  `;

  constructor() {
    super();
    this.financialBoxOfficeRevenue = financialService.getBoxOfficeRevenue();
  }

  @state()
  private customerIDUsedInChart?: string;

  @state()
  private orderIDUsedInGrid?: number;

  @state()
  private financialBoxOfficeRevenue: BoxOfficeRevenueType[] = [];

  render() {
    return html`
      <style>${unsafeCSS(baseStyles)}</style>
      <style>${gridThemeLightMaterial}</style>
      <div class="column-layout group">
        <igc-tree selection="none" @click=${() => Router.go(`/tree-example`)} class="tree">
          <igc-tree-item ?expanded=${true}>
            <igc-tree-item ?expanded=${true}>
              ${this.financialBoxOfficeRevenue?.map((item) => html`
                <igc-tree-item label=${ifDefined(item.Franchise)} ?expanded=${true}></igc-tree-item>
              `)}
            </igc-tree-item>
          </igc-tree-item>
        </igc-tree>
      </div>
      <div class="column-layout group_1">
        <div class="column-layout group_2">
          <igc-grid primary-key="orderId" ?allow-filtering=${true} filter-mode="excelStyleFilter" class="ig-typography ig-scrollbar grid">
            <igc-column field="orderId" data-type="number" header="orderId" ?sortable=${true} selectable="false"></igc-column>
            <igc-column field="productId" data-type="number" header="productId" ?sortable=${true} selectable="false"></igc-column>
            <igc-column field="unitPrice" data-type="number" header="unitPrice" ?sortable=${true} selectable="false"></igc-column>
            <igc-column field="quantity" data-type="number" header="quantity" ?sortable=${true} selectable="false"></igc-column>
            <igc-column field="discount" data-type="number" header="discount" ?sortable=${true} selectable="false"></igc-column>
          </igc-grid>
          <p class="typography__body-1 text">
            ${this.customerIDUsedInChart}
          </p>
        </div>
        <div class="column-layout group_2">
          <igc-category-chart computed-plot-area-margin-mode="series" class="category-chart"></igc-category-chart>
        </div>
      </div>
    `;
  }
}
