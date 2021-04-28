import * as React from 'react';
import styles from './ProjectlistWebpart.module.scss';
import { IProjectlistWebpartProps } from './IProjectlistWebpartProps';
import { IProjectlistWebpartState } from './IProjectlistWebpartState';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import { IFeatures, Features } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import { Icon } from '@fluentui/react/lib/Icon';
import { Items } from '@pnp/sp/items';








export default class Projectlist extends React.Component<IProjectlistWebpartProps, IProjectlistWebpartState> {
  public constructor(props: IProjectlistWebpartProps) {
    super(props);

    this.state = {
      // 
      items: [],
      itemsPrice: []


    };
  }



  public componentDidMount() {
    this.getItemsFromrequests();
    console.log(this.state.items);
  }
  public async getItemsFromrequests() {
    // как припер достать список таким образом
    const list = await sp.web.lists.getByTitle("Requests");
    const list2 = await sp.web.lists.getByTitle("Price");
    // we can use this 'list' variable to run more queries on the list:
    const allItems = await list.items.expand("AttachmentFiles").select("AttachmentFiles/FileName", "AttachmentFiles/ServerRelativePath", "TrCurrency", "TrNumberOfCopies", "TrOrderDate", "TrStatus").get();;
    const allItems2 = await list2.items.expand().get();
    // Меняем состояние items при помощи метода setState()
    await this.setState({ items: allItems });
    await this.setState({ itemsPrice: allItems2 });

    this.price()
    console.log(this.state.items)

  }


  public price() {

    let x = this.state.items;
    for (let i = 0; i < this.state.items.length; i++) {
      for (let j = 0; j < this.state.itemsPrice.length; j++) {

        if (this.state.items[i].TrNumberOfCopies > this.state.itemsPrice[this.state.itemsPrice.length - 1].Title) {
          let op = x[i].TrNumberOfCopies * this.state.itemsPrice[this.state.itemsPrice.length - 1].Title;
          x[i].op = this.state.items[i].TrNumberOfCopies * this.state.itemsPrice[j].TrPrices;
          break;
        }
        git branch -M master
        <table className={`${styles.table}`}>
          <tr >
            <th >Название заказа</th>
            <th>№Заказа</th>
            <th>Количество экземпляров</th>
            <th>Цена</th>
            <th>Attachment</th>
            <th>Статус</th>
          </tr>

          {items.map(item => {
            // dateObj.toLocaleDateString([locales [, options]])
            // let date = item.TrOrderDate.toLocaleString(); 
            let date = new Date(item.TrOrderDate).toLocaleDateString();



            console.log('item.AttachmentFiles', item.AttachmentFiles);

            return (
              <tr>
                <td>{item.Id}</td>
                <td>{item.Id}_{date}</td>
                <td>{item.TrNumberOfCopies}</td>
                <td>{item.op}</td>
                <td><a href={item.AttachmentFiles[0].ServerRelativePath.DecodedUrl} download> {this.MyIcon()}  Down</a></td>
                {/* Кнопка Сохранить меняет значение статуса на «Новый»
Кнопка Отправить меняет значение статуса на «В процессе»
Кнопка Отклонить меняет значение статуса на «Отклонен»
Кнопка Подтвердить меняет значение статуса на «Подтвержден»

Кнопки “Сохранить” и “Отправить” отрисовываются если статус со значением «Новый»
Кнопки “Отклонить” и “Подтвердить” отрисовываются если статус со значением «В процессе»
Если статус со значением «Подтвержден» поле без кнопок.
Если статус со значением «Отклонен» поле без кнопок, background-color меняем на красный. */}

                <td>
                  <p>{item.TrStatus}</p>
                  <button onClick={this.save}>Сохранить </button>
                  <button>Отправить</button>
                  <button>Отклонить</button>
                  <button>Подтвердить</button>


                </td>
              </tr>
            )

          })
          }
        </table>
      </div>

    );
  }


}
{/* <i data-icon-name="Attach" aria-hidden="true" class="root-178"></i> */ }




